# MinIO

MinIO provides S3-compatible object storage for UTube.

## Local access

API:

`http://localhost:9000`

Console:

`http://localhost:9001`

## Buckets

### utube-originals

Original uploaded videos.

### utube-processed

Processed HLS output:

```text
processed/<videoId>/master.m3u8
processed/<videoId>/360p/index.m3u8
processed/<videoId>/480p/index.m3u8
processed/<videoId>/720p/index.m3u8
processed/<videoId>/360p/segment_000.ts
...
```

### utube-thumbnails

Generated thumbnails:

```text
thumbnails/<videoId>.jpg
```

The exact FFmpeg output layout can be adjusted with Member 3, but the
bucket responsibilities should remain stable.
