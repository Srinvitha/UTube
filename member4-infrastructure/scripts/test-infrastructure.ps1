Write-Host "===== UTube Infrastructure Health Check =====" -ForegroundColor Cyan

Write-Host "`n[1/5] Docker containers"
docker ps --filter "name=utube-" --format "table {{.Names}}\t{{.Status}}"

Write-Host "`n[2/5] PostgreSQL"
docker exec utube-postgres pg_isready -U utube_user -d utube

Write-Host "`n[3/5] Redis"
docker exec utube-redis redis-cli ping

Write-Host "`n[4/5] RabbitMQ"
docker exec utube-rabbitmq rabbitmq-diagnostics -q ping

Write-Host "`n[5/5] MinIO"
docker exec utube-minio mc ready local

Write-Host "`n===== Check complete =====" -ForegroundColor Green
