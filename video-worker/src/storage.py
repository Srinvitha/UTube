import os
import boto3


S3_ENDPOINT = os.getenv(
    "S3_ENDPOINT",
    "http://localhost:8333"
)

S3_ACCESS_KEY = os.getenv(
    "S3_ACCESS_KEY",
    ""
)

S3_SECRET_KEY = os.getenv(
    "S3_SECRET_KEY",
    ""
)


s3 = boto3.client(
    "s3",
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY,
    region_name="us-east-1"
)


def upload_file(local_file, bucket, object_key):
    """
    Upload a local file to SeaweedFS S3.
    """

    print(f"Uploading: {local_file}")
    print(f"Bucket: {bucket}")
    print(f"Object: {object_key}")

    s3.upload_file(
        local_file,
        bucket,
        object_key
    )

    print("Upload completed.")

    return f"{bucket}/{object_key}"