import subprocess
import os


def create_hls(input_file, output_dir, height):
    os.makedirs(output_dir, exist_ok=True)

    playlist = os.path.join(output_dir, "index.m3u8")

    command = [
        "ffmpeg",
        "-i", input_file,

        "-vf", f"scale=-2:{height}",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",

        "-c:a", "aac",
        "-b:a", "128k",

        "-f", "hls",
        "-hls_time", "6",
        "-hls_playlist_type", "vod",

        "-hls_segment_filename",
        os.path.join(output_dir, "segment_%03d.ts"),

        "-y",
        playlist
    ]

    result = subprocess.run(command)

    if result.returncode != 0:
        raise Exception(f"{height}p HLS processing failed")

    return playlist