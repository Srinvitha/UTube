# UTube Video Worker

Consumes jobs from RabbitMQ queue `video.processing`.

Expected job:
{
  "videoId": "video-1",
  "originalKey": "originals/video-1/video.mp4"
}

Flow:
RabbitMQ -> SeaweedFS original -> FFmpeg -> HLS 360/480/720 -> SeaweedFS processed -> RabbitMQ completed/failed.

Environment:
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=utube
RABBITMQ_PASSWORD=change_me
S3_ENDPOINT=http://localhost:8333
ORIGINALS_BUCKET=utube-originals
PROCESSED_BUCKET=utube-processed
THUMBNAILS_BUCKET=utube-thumbnails
