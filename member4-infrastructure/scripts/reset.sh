#!/bin/sh
set -e

cd "$(dirname "$0")/../docker"

echo "WARNING: this removes all UTube infrastructure volumes."
docker compose --env-file ../.env down -v

echo "UTube infrastructure reset."
