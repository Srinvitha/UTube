# UTube — Member 4: Infrastructure, Storage & Messaging

This folder contains the infrastructure layer for the UTube project.

## Responsibilities

- PostgreSQL container
- Redis cache
- RabbitMQ message broker
- MinIO object storage
- Nginx reverse proxy
- Docker networking
- Environment configuration
- Infrastructure scripts
- Health checks and local integration testing

## Services

| Service | Container | Port | Purpose |
|---|---|---:|---|
| PostgreSQL | utube-postgres | 5432 | Application metadata |
| Redis | utube-redis | 6379 | Cache |
| RabbitMQ | utube-rabbitmq | 5672 | Message broker |
| RabbitMQ UI | utube-rabbitmq | 15672 | Management dashboard |
| MinIO API | utube-minio | 9000 | Object storage |
| MinIO Console | utube-minio | 9001 | Storage dashboard |
| Nginx | utube-nginx | 80 | Reverse proxy |

## Storage buckets

- `utube-originals` — uploaded source videos
- `utube-processed` — HLS playlists and segments
- `utube-thumbnails` — generated thumbnails

## RabbitMQ queues

- `video.processing`
- `video.completed`
- `video.failed`

## Start

From this folder:

```bash
docker compose --env-file .env up -d
```

Check:

```bash
docker compose ps
```

Stop:

```bash
docker compose down
```

Stop and delete local volumes:

```bash
docker compose down -v
```

## Important integration contract

Backend -> worker:

```json
{
  "videoId": "123",
  "inputPath": "originals/123.mp4"
}
```

Worker -> backend:

```json
{
  "videoId": "123",
  "status": "READY",
  "hlsPath": "processed/123/master.m3u8",
  "thumbnailPath": "thumbnails/123.jpg"
}
```

Worker failure:

```json
{
  "videoId": "123",
  "status": "FAILED",
  "error": "FFmpeg processing failed"
}
```

## Future integration

The final system should connect:

```text
React Frontend
      |
      v
    Nginx
      |
      v
Spring Boot Backend
   |       |       |
   v       v       v
Postgres Redis  RabbitMQ
                  |
                  v
             Python Worker
                  |
                  v
                MinIO
                  |
                  v
             HLS Playback
```

Members 1–3 can be added later without changing the infrastructure contracts above unless the team explicitly agrees to a change.
