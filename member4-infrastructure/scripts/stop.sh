#!/bin/sh
set -e

cd "$(dirname "$0")/../docker"

docker compose --env-file ../.env down
echo "UTube infrastructure stopped."
