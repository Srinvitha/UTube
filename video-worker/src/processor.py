import os

from src.video_info import get_video_info
from src.thumbnail import generate_thumbnail
from src.hls import create_hls


def save_status(output_dir, status, error=None):
    status_file = os.path.join(output_dir, "status.txt")

    with open(status_file, "w") as file:
        file.write(f"status={status}\n")

        if error:
            file.write(f"error={error}\n")


def process_video(input_file, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    save_status(output_dir, "PROCESSING")
    print("\nStatus: PROCESSING")

    try:
        print("\nReading video information...")
        info = get_video_info(input_file)
        duration = info["format"]["duration"]
        thumbnail_time = min(5.0, max(0.0, float(duration) / 2))
        print(f"Duration: {duration} seconds")

        print("\nGenerating thumbnail...")
        thumbnail = os.path.join(output_dir, "thumbnail.jpg")
        generate_thumbnail(input_file, thumbnail, thumbnail_time)
        print("Thumbnail completed.")

        qualities = {
            360: 800000,
            480: 1400000,
            720: 2800000,
        }

        for height in qualities:
            print(f"\nGenerating {height}p HLS...")
            quality_dir = os.path.join(output_dir, f"{height}p")
            create_hls(input_file, quality_dir, height)
            print(f"{height}p completed.")

        print("\nCreating master playlist...")

        master_playlist = """#EXTM3U
#EXT-X-VERSION:3

# 360p
#EXT-X-STREAM-INF:BANDWIDTH=800000,AVERAGE-BANDWIDTH=700000,RESOLUTION=640x360,CODECS="avc1.64001e,mp4a.40.2"
360p/index.m3u8

# 480p
#EXT-X-STREAM-INF:BANDWIDTH=1400000,AVERAGE-BANDWIDTH=1200000,RESOLUTION=854x480,CODECS="avc1.64001f,mp4a.40.2"
480p/index.m3u8

# 720p
#EXT-X-STREAM-INF:BANDWIDTH=2800000,AVERAGE-BANDWIDTH=2500000,RESOLUTION=1280x720,CODECS="avc1.64001f,mp4a.40.2"
720p/index.m3u8
"""

        master_file = os.path.join(output_dir, "master.m3u8")

        with open(master_file, "w") as file:
            file.write(master_playlist)

        save_status(output_dir, "READY")

        print("\nProcessing completed!")
        print("Status: READY")

        return {
            "status": "READY",
            "thumbnail": thumbnail,
            "master_playlist": master_file,
        }

    except Exception as error:
        save_status(output_dir, "FAILED", str(error))

        print("\nProcessing failed!")
        print(f"Error: {error}")
        print("Status: FAILED")

        return {
            "status": "FAILED",
            "error": str(error),
        }
