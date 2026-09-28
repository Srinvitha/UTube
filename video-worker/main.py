import json
import os
import shutil
import pika

from src.processor import process_video
from src.storage import (
    download_file,
    upload_directory,
    ensure_bucket,
)

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", "5672"))
RABBITMQ_USER = os.getenv("RABBITMQ_USER", "utube")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD", "change_me")

PROCESSING_QUEUE = "video.processing"
COMPLETED_QUEUE = "video.completed"
FAILED_QUEUE = "video.failed"

ORIGINALS_BUCKET = os.getenv("ORIGINALS_BUCKET", "utube-originals")
PROCESSED_BUCKET = os.getenv("PROCESSED_BUCKET", "utube-processed")
THUMBNAILS_BUCKET = os.getenv("THUMBNAILS_BUCKET", "utube-thumbnails")

WORK_DIR = "work"


def publish(channel, queue, message):
    channel.queue_declare(queue=queue, durable=True)
    channel.basic_publish(
        exchange="",
        routing_key=queue,
        body=json.dumps(message).encode(),
        properties=pika.BasicProperties(delivery_mode=2),
    )


def process_message(channel, method, properties, body):
    video_id = None
    work_dir = None

    try:
        message = json.loads(body)

        video_id = str(message["videoId"])
        original_key = message["originalKey"]

        print("\n===================================")
        print("          UTube VIDEO WORKER")
        print("===================================")
        print(f"Video ID: {video_id}")
        print(f"Original: {original_key}")
        print("Status: PROCESSING")

        ensure_bucket(ORIGINALS_BUCKET)
        ensure_bucket(PROCESSED_BUCKET)
        ensure_bucket(THUMBNAILS_BUCKET)

        work_dir = os.path.join(WORK_DIR, video_id)
        input_dir = os.path.join(work_dir, "input")
        output_dir = os.path.join(work_dir, "output")

        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        filename = os.path.basename(original_key) or "video.mp4"
        input_file = os.path.join(input_dir, filename)

        print("Downloading original from SeaweedFS...")
        download_file(ORIGINALS_BUCKET, original_key, input_file)

        result = process_video(input_file, output_dir)

        if result["status"] != "READY":
            raise RuntimeError(result.get("error", "Video processing failed"))

        processed_prefix = f"processed/{video_id}"
        thumbnail_key = f"thumbnails/{video_id}/thumbnail.jpg"

        print("Uploading processed HLS to SeaweedFS...")
        upload_directory(
            output_dir,
            PROCESSED_BUCKET,
            processed_prefix,
            exclude_files={"status.txt"},
        )

        print("Uploading thumbnail to SeaweedFS...")
        from src.storage import upload_file
        upload_file(
            result["thumbnail"],
            THUMBNAILS_BUCKET,
            thumbnail_key,
        )

        completion = {
            "videoId": video_id,
            "status": "READY",
            "masterPlaylistKey": f"{processed_prefix}/master.m3u8",
            "thumbnailKey": thumbnail_key,
        }

        publish(channel, COMPLETED_QUEUE, completion)

        print("Status: READY")
        print(f"Master playlist: {completion['masterPlaylistKey']}")
        print(f"Thumbnail: {completion['thumbnailKey']}")

        channel.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as error:
        print(f"Worker error: {error}")

        failure = {
            "videoId": video_id,
            "status": "FAILED",
            "error": str(error),
        }

        try:
            publish(channel, FAILED_QUEUE, failure)
        finally:
            channel.basic_nack(
                delivery_tag=method.delivery_tag,
                requeue=False,
            )

    finally:
        if work_dir and os.path.exists(work_dir):
            shutil.rmtree(work_dir, ignore_errors=True)


def main():
    credentials = pika.PlainCredentials(
        RABBITMQ_USER,
        RABBITMQ_PASSWORD,
    )

    parameters = pika.ConnectionParameters(
        host=RABBITMQ_HOST,
        port=RABBITMQ_PORT,
        credentials=credentials,
    )

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    channel.queue_declare(queue=PROCESSING_QUEUE, durable=True)
    channel.queue_declare(queue=COMPLETED_QUEUE, durable=True)
    channel.queue_declare(queue=FAILED_QUEUE, durable=True)

    channel.basic_qos(prefetch_count=1)

    channel.basic_consume(
        queue=PROCESSING_QUEUE,
        on_message_callback=process_message,
    )

    print("===================================")
    print("          UTube VIDEO WORKER")
    print("===================================")
    print(f"RabbitMQ: {RABBITMQ_HOST}:{RABBITMQ_PORT}")
    print(f"Queue: {PROCESSING_QUEUE}")
    print("Waiting for video processing jobs...")
    print("===================================")

    channel.start_consuming()


if __name__ == "__main__":
    main()
