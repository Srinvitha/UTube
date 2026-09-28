import subprocess
import os


def create_360p(input_file, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    playlist = os.path.join(output_dir, "index.m3u8")

    command = [
        "ffmpeg",
        "-i", input_file,

        # Video
        "-vf", "scale=-2:360",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",

        # Audio
        "-c:a", "aac",
        "-b:a", "128k",

        # HLS
        "-f", "hls",
        "-hls_time", "6",
        "-hls_playlist_type", "vod",

        # Segment filenames
        "-hls_segment_filename",
        os.path.join(output_dir, "segment_%03d.ts"),

        "-y",
        playlist
    ]

    result = subprocess.run(command)

    if result.returncode != 0:
        raise Exception("360p HLS processing failed")

    return playlist