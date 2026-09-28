#!/bin/sh
set -e

echo "===== UTube Infrastructure Health Check ====="

echo ""
echo "[1/5] Docker containers"
docker ps --filter "name=utube-" --format "table {{.Names}}\t{{.Status}}"

echo ""
echo "[2/5] PostgreSQL"
docker exec utube-postgres pg_isready -U "${POSTGRES_USER:-utube_user}" -d "${POSTGRES_DB:-utube}" || true

echo ""
echo "[3/5] Redis"
docker exec utube-redis redis-cli ping

echo ""
echo "[4/5] RabbitMQ"
docker exec utube-rabbitmq rabbitmq-diagnostics -q ping

echo ""
echo "[5/5] MinIO"
docker exec utube-minio mc ready local

echo ""
echo "===== Check complete ====="
