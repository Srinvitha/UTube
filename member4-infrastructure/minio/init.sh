#!/bin/sh

set -e

echo "Waiting for MinIO..."
until mc alias set utube http://minio:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"; do
    sleep 2
done

echo "Creating UTube buckets..."

mc mb --ignore-existing "utube/$MINIO_ORIGINALS_BUCKET"
mc mb --ignore-existing "utube/$MINIO_PROCESSED_BUCKET"
mc mb --ignore-existing "utube/$MINIO_THUMBNAILS_BUCKET"

echo "MinIO buckets ready:"
mc ls utube

echo "MinIO initialization complete."
