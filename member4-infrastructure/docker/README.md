# Docker Infrastructure

This directory contains the Docker Compose definition for UTube.

The Compose file intentionally keeps application services such as the future
Spring Boot backend, React frontend, and Python video worker outside this
initial infrastructure setup.

When the other members finish their services, they can be added to the same
Docker network:

`utube-network`

Expected service names:

- `frontend`
- `backend`
- `video-worker`

This allows infrastructure components to communicate through Docker DNS.
