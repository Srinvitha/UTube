import subprocess
import os


def generate_thumbnail(input_file, output_file, timestamp=5):
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    command = [
    "ffmpeg",
    "-i", input_file,
    "-ss", str(timestamp),
    "-frames:v", "1",
    "-update", "1",
    "-y",
    output_file
    ]
    result = subprocess.run(command)

    if result.returncode != 0:
        raise Exception("Thumbnail generation failed")

    return output_file