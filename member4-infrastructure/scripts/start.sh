#!/bin/sh
set -e

cd "$(dirname "$0")/../docker"

if [ ! -f ../.env ]; then
    echo "ERROR: .env file not found."
    echo "Copy .env.example to .env first."
    exit 1
fi

docker compose --env-file ../.env up -d

echo ""
echo "UTube infrastructure started."
echo ""
docker compose --env-file ../.env ps
