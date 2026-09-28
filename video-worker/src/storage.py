import os
import boto3


S3_ENDPOINT = os.getenv("S3_ENDPOINT", "http://localhost:8333")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", "")

s3 = boto3.client(
    "s3",
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY,
    region_name="us-east-1",
)


def ensure_bucket(bucket):
    try:
        s3.head_bucket(Bucket=bucket)
    except Exception:
        print(f"Creating bucket: {bucket}")
        s3.create_bucket(Bucket=bucket)


def upload_file(local_file, bucket, object_key):
    print(f"Uploading: {local_file}")
    print(f"Bucket: {bucket}")
    print(f"Object: {object_key}")

    s3.upload_file(local_file, bucket, object_key)

    print("Upload completed.")
    return f"{bucket}/{object_key}"


def download_file(bucket, object_key, local_file):
    print(f"Downloading: {bucket}/{object_key}")
    os.makedirs(os.path.dirname(local_file), exist_ok=True)

    s3.download_file(
        bucket,
        object_key,
        local_file,
    )

    print(f"Download completed: {local_file}")
    return local_file


def upload_directory(local_dir, bucket, prefix, exclude_files=None):
    exclude_files = exclude_files or set()

    for root, _, files in os.walk(local_dir):
        for filename in files:
            if filename in exclude_files:
                continue

            local_path = os.path.join(root, filename)
            relative_path = os.path.relpath(
                local_path,
                local_dir,
            ).replace(os.sep, "/")

            object_key = f"{prefix}/{relative_path}"

            upload_file(
                local_path,
                bucket,
                object_key,
            )
