import boto3


S3_ENDPOINT = "http://localhost:8333"


s3 = boto3.client(
    "s3",
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id="",
    aws_secret_access_key="",
    region_name="us-east-1"
)


print("Connecting to SeaweedFS...")

response = s3.list_buckets()

print("\nBuckets found:")

for bucket in response.get("Buckets", []):
    print("-", bucket["Name"])