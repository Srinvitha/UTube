# UTube

### A Small-Scale Video Sharing & Streaming Platform

UTube is a full-stack video sharing and streaming platform inspired by modern video platforms. It provides user authentication, video uploads, video metadata management, asynchronous video processing, multi-quality transcoding, thumbnail generation, and HLS-based video streaming.

The system is designed as a collection of specialized services that work together to handle application logic, data storage, messaging, and video processing.

---

# 1. Features

### User Features

- User registration
- User login
- JWT-based authentication
- Browse videos
- Search videos
- Watch videos
- Upload videos
- Add video title and description
- Upload optional thumbnails
- Creator channel and dashboard interfaces

### Video Processing

- Original video storage
- Asynchronous video processing
- Automatic thumbnail generation
- FFmpeg-based transcoding
- Multiple video qualities:
  - 360p
  - 480p
  - 720p
- HLS master playlist generation
- HLS-based video playback

---

# 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Spring Boot |
| Backend Language | Java 21 |
| Database | PostgreSQL |
| Cache | Redis |
| Message Queue | RabbitMQ |
| Object Storage | SeaweedFS S3 |
| Video Processing | Python + FFmpeg |
| Streaming | HLS |
| HLS Playback | hls.js |
| Authentication | JWT |
| Reverse Proxy | Nginx |
| Containerization | Docker + Docker Compose |
| Version Control | Git + GitHub |

---

# 3. System Architecture

```text
                              ┌───────────────────┐
                              │       USER        │
                              │     BROWSER       │
                              └─────────┬─────────┘
                                        │
                                        ▼
                              ┌───────────────────┐
                              │   REACT + VITE    │
                              │     FRONTEND      │
                              └─────────┬─────────┘
                                        │
                                  HTTP / REST
                                        │
                                        ▼
                              ┌───────────────────┐
                              │       NGINX       │
                              │  REVERSE PROXY    │
                              └─────────┬─────────┘
                                        │
                                        ▼
                         ┌────────────────────────────┐
                         │       SPRING BOOT          │
                         │          BACKEND           │
                         │                            │
                         │ Authentication             │
                         │ User Management             │
                         │ Video APIs                  │
                         │ Upload Management            │
                         └──────┬──────┬──────┬──────┘
                                │      │      │
                    ┌───────────┘      │      └────────────┐
                    ▼                  ▼                   ▼
             ┌────────────┐    ┌────────────┐     ┌─────────────┐
             │ PostgreSQL │    │   Redis    │     │  SeaweedFS  │
             │            │    │            │     │    S3       │
             │ Users      │    │   Cache    │     │             │
             │ Videos     │    │            │     │ Originals   │
             │ Metadata   │    │            │     │ Thumbnails  │
             └────────────┘    └────────────┘     │ HLS Output  │
                                                  └──────┬──────┘
                                                         │
                                                         │
                                               Processing Job
                                                         │
                                                         ▼
                                                  ┌────────────┐
                                                  │ RabbitMQ   │
                                                  │            │
                                                  │ Processing │
                                                  │ Completed  │
                                                  │ Failed     │
                                                  └─────┬──────┘
                                                        │
                                                        ▼
                                               ┌────────────────┐
                                               │ Python Worker  │
                                               │                │
                                               │ Download       │
                                               │ Process        │
                                               │ Upload         │
                                               └───────┬────────┘
                                                       │
                                                       ▼
                                                  ┌─────────┐
                                                  │ FFmpeg  │
                                                  └────┬────┘
                                                       │
                                    ┌──────────────────┼──────────────────┐
                                    ▼                  ▼                  ▼
                                  360p               480p               720p
                                    └──────────────────┼──────────────────┘
                                                       ▼
                                                  ┌─────────┐
                                                  │   HLS   │
                                                  └────┬────┘
                                                       │
                                                       ▼
                                                  SeaweedFS
                                                       │
                                                       ▼
                                                  HLS Player
```

---

# 4. Application Flow

```text
                         ┌───────────────┐
                         │     USER      │
                         └───────┬───────┘
                                 │
                                 ▼
                     ┌──────────────────────┐
                     │   Open UTube        │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │ Register / Login     │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │   JWT Authentication │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │     Home / Feed      │
                     └──────────┬───────────┘
                                │
               ┌────────────────┼────────────────┐
               │                │                │
               ▼                ▼                ▼
           ┌────────┐      ┌────────┐      ┌──────────┐
           │ Search │      │ Watch  │      │ Channel  │
           └────────┘      └────────┘      └──────────┘
                               
                               
                         CREATOR FLOW
                                │
                                ▼
                         ┌────────────┐
                         │   Upload   │
                         └─────┬──────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │ Video + Metadata │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Spring Boot API  │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │    SeaweedFS     │
                     │ Original Video   │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │     RabbitMQ     │
                     │ Processing Job   │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  Python Worker   │
                     └────────┬─────────┘
                              │
                              ▼
                         ┌─────────┐
                         │ FFmpeg  │
                         └────┬────┘
                              │
                     ┌────────┼────────┐
                     ▼        ▼        ▼
                   360p     480p     720p
                     └────────┼────────┘
                              ▼
                           HLS
                              │
                              ▼
                        SeaweedFS
                              │
                              ▼
                         Watch Video
```

---

# 5. Video Processing Pipeline

The video processing system works asynchronously so that video transcoding is handled independently from the main backend.

```text
┌──────────────┐
│ Video Upload │
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│   Spring Boot API   │
└──────────┬──────────┘
           │
           ├───────────────────────┐
           │                       │
           ▼                       ▼
    ┌─────────────┐         ┌─────────────┐
    │ PostgreSQL  │         │  SeaweedFS  │
    │  Metadata   │         │   Original  │
    └─────────────┘         └──────┬──────┘
                                   │
                                   │
                         ┌─────────▼─────────┐
                         │     RabbitMQ      │
                         │ video.processing  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   Python Worker   │
                         └─────────┬─────────┘
                                   │
                                   ▼
                              ┌─────────┐
                              │ FFmpeg  │
                              └────┬────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
                  360p           480p           720p
                    │              │              │
                    └──────────────┼──────────────┘
                                   ▼
                             ┌───────────┐
                             │ HLS Files │
                             └─────┬─────┘
                                   │
                                   ▼
                             ┌───────────┐
                             │ SeaweedFS │
                             └─────┬─────┘
                                   │
                                   ▼
                             ┌───────────┐
                             │ hls.js    │
                             │  Player   │
                             └───────────┘
```

---

# 6. Video Status Lifecycle

```text
              ┌───────────┐
              │ UPLOADING │
              └─────┬─────┘
                    │
                    ▼
              ┌───────────┐
              │  UPLOADED │
              └─────┬─────┘
                    │
                    ▼
             ┌─────────────┐
             │ PROCESSING  │
             └──────┬──────┘
                    │
              ┌─────┴─────┐
              │           │
              ▼           ▼
        ┌─────────┐   ┌─────────┐
        │  READY  │   │ FAILED  │
        └─────────┘   └─────────┘
```

---

# 7. Storage Architecture

SeaweedFS provides S3-compatible object storage for media files.

```text
                     ┌──────────────────────┐
                     │      SeaweedFS       │
                     │       S3 API         │
                     └──────────┬───────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
      ┌───────────────┐ ┌───────────────┐ ┌─────────────────┐
      │utube-originals│ │utube-processed│ │utube-thumbnails │
      ├───────────────┤ ├───────────────┤ ├─────────────────┤
      │ Original      │ │ master.m3u8   │ │ thumbnail.jpg   │
      │ video files   │ │ 360p          │ │                 │
      │               │ │ 480p          │ │                 │
      │               │ │ 720p          │ │                 │
      └───────────────┘ └───────────────┘ └─────────────────┘
```

Example object paths:

```text
originals/<videoId>/<filename>

processed/<videoId>/master.m3u8
processed/<videoId>/360p/index.m3u8
processed/<videoId>/480p/index.m3u8
processed/<videoId>/720p/index.m3u8

thumbnails/<videoId>/thumbnail.jpg
```

---

# 8. RabbitMQ Architecture

RabbitMQ connects the backend and video worker.

```text
                    ┌─────────────────┐
                    │ Spring Boot     │
                    │ Backend         │
                    └────────┬────────┘
                             │
                             │ Publish
                             ▼
                 ┌────────────────────────┐
                 │   video.processing     │
                 └────────────┬───────────┘
                              │
                              │ Consume
                              ▼
                    ┌─────────────────┐
                    │ Python Worker   │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                 Success            Failure
                    │                 │
                    ▼                 ▼
          ┌────────────────┐   ┌────────────────┐
          │video.completed │   │  video.failed  │
          └────────────────┘   └────────────────┘
```

---

# 9. Authentication Flow

UTube uses JWT-based authentication.

```text
┌──────────────┐
│    User      │
└──────┬───────┘
       │
       │ Register
       ▼
┌────────────────┐
│ Spring Boot    │
│ Auth API       │
└───────┬────────┘
        │
        ▼
   ┌─────────┐
   │PostgreSQL│
   └─────────┘


        Login
          │
          ▼
┌────────────────┐
│ Spring Boot    │
│ Auth API       │
└───────┬────────┘
        │
        ▼
   ┌───────────┐
   │ JWT Token │
   └─────┬─────┘
         │
         ▼
┌────────────────────┐
│ React Frontend     │
│ Stores JWT         │
└─────────┬──────────┘
          │
          │ Authorization:
          │ Bearer <token>
          ▼
┌────────────────────┐
│ Protected Backend  │
│      APIs          │
└────────────────────┘
```

---

# 10. Repository Structure

```text
UTube/
│
├── Frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       │
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── src/
│       ├── main/
│       └── test/
│
├── video-worker/
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── src/
│       ├── processor.py
│       ├── hls.py
│       ├── storage.py
│       ├── thumbnail.py
│       └── video_info.py
│
├── member4-infrastructure/
│   ├── docker/
│   │   └── docker-compose.yml
│   ├── nginx/
│   ├── rabbitmq/
│   ├── redis/
│   └── scripts/
│
└── README.md
```

---

# 11. Requirements

Install the following before running UTube:

- Git
- Docker Desktop
- Java 21
- Node.js and npm
- Python 3
- FFmpeg

Recommended:

- VS Code
- Chrome / Microsoft Edge

---

# 12. First-Time Setup

Use this section if UTube has **never been run on your computer before**.

## Step 1 — Clone

Open PowerShell:

```powershell
git clone https://github.com/Srinvitha/UTube.git
cd UTube
git switch main
```

---

## Step 2 — Start Infrastructure

### Terminal 1

```powershell
cd UTube
docker compose -f member4-infrastructure/docker/docker-compose.yml up -d
```

Check:

```powershell
docker ps
```

The following services should be running:

```text
utube-postgres
utube-redis
utube-rabbitmq
utube-storage
utube-nginx
```

---

## Step 3 — Start Backend

### Terminal 2

```powershell
cd UTube\backend
```

Run:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.jvmArguments=-Dutube.storage.access-key=utube -Dutube.storage.secret-key=change_me -Dutube.storage.endpoint=http://localhost:8333"
```

Wait until the backend reports that Tomcat has started on port `8080`.

Keep the terminal running.

---

## Step 4 — Install and Start Worker

### Terminal 3

```powershell
cd UTube\video-worker
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Set RabbitMQ configuration:

```powershell
$env:RABBITMQ_HOST="localhost"
$env:RABBITMQ_PORT="5672"
$env:RABBITMQ_USER="utube"
$env:RABBITMQ_PASSWORD="change_me"
```

Set storage configuration:

```powershell
$env:S3_ENDPOINT="http://localhost:8333"
$env:S3_ACCESS_KEY="utube"
$env:S3_SECRET_KEY="change_me"
```

Start the worker:

```powershell
python main.py
```

The worker should display:

```text
Waiting for video processing jobs...
```

Keep the terminal running.

---

## Step 5 — Install and Start Frontend

### Terminal 4

```powershell
cd UTube\Frontend
```

Install dependencies:

```powershell
npm install
```

Start the frontend:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173/
```

---

# 13. Running UTube Again

## ⭐ For normal use after the project has already been set up

You **do not need to clone the repository again**.

You also normally do not need to run `npm install` or `pip install` again.

Simply start the four parts.

---

### Terminal 1 — Docker

```powershell
cd E:\Projects\UTube

docker compose -f member4-infrastructure/docker/docker-compose.yml up -d
```

---

### Terminal 2 — Backend

```powershell
cd E:\Projects\UTube\backend

.\mvnw.cmd spring-boot:run "-Dspring-boot.run.jvmArguments=-Dutube.storage.access-key=utube -Dutube.storage.secret-key=change_me -Dutube.storage.endpoint=http://localhost:8333"
```

---

### Terminal 3 — Worker

```powershell
cd E:\Projects\UTube\video-worker

$env:RABBITMQ_HOST="localhost"
$env:RABBITMQ_PORT="5672"
$env:RABBITMQ_USER="utube"
$env:RABBITMQ_PASSWORD="change_me"

$env:S3_ENDPOINT="http://localhost:8333"
$env:S3_ACCESS_KEY="utube"
$env:S3_SECRET_KEY="change_me"

python main.py
```

---

### Terminal 4 — Frontend

```powershell
cd E:\Projects\UTube\Frontend

npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

# 14. Quick Start for Returning Developers

If the project has already been configured, this is the entire startup procedure:

```text
┌─────────────────────────────────────────────────────────────┐
│                     U T U B E                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Docker Infrastructure                                   │
│     docker compose ... up -d                                │
│                                                             │
│  2. Spring Boot Backend                                     │
│     ./mvnw spring-boot:run                                  │
│                                                             │
│  3. Python Video Worker                                    │
│     python main.py                                          │
│                                                             │
│  4. React Frontend                                          │
│     npm run dev                                             │
│                                                             │
│                    ↓                                        │
│                                                             │
│             http://localhost:5173                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 15. Application URLs

| Component | URL |
|---|---|
| UTube Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:8080` |
| Nginx | `http://localhost` |
| SeaweedFS S3 | `http://localhost:8333` |
| RabbitMQ Management | `http://localhost:15672` |
| PostgreSQL | `localhost:5432` |
| Redis | `localhost:6379` |

---

# 16. Using the Application

## Register

Open:

```text
http://localhost:5173/register
```

Create an account using:

- Full name
- Email
- Password

---

## Login

Open:

```text
http://localhost:5173/login
```

After successful authentication, the frontend receives a JWT token and uses it for protected API requests.

---

## Browse

Open:

```text
http://localhost:5173/
```

Browse available videos and application content.

---

## Upload

Open:

```text
http://localhost:5173/upload
```

Provide:

- Video file
- Title
- Description
- Optional thumbnail

Select:

**Upload and Transcode**

The video then follows the processing pipeline:

```text
Upload
  │
  ▼
Spring Boot
  │
  ├──────────────► PostgreSQL
  │
  ▼
SeaweedFS
  │
  ▼
RabbitMQ
  │
  ▼
Python Worker
  │
  ▼
FFmpeg
  │
  ├──────► 360p
  ├──────► 480p
  └──────► 720p
              │
              ▼
             HLS
              │
              ▼
          SeaweedFS
              │
              ▼
          HLS Player
```

---

# 17. Stopping UTube

Stop the frontend:

```text
Ctrl + C
```

Stop the worker:

```text
Ctrl + C
```

Stop the backend:

```text
Ctrl + C
```

Then stop Docker infrastructure:

```powershell
docker compose -f member4-infrastructure/docker/docker-compose.yml down
```

---

# 18. Restarting Later

When you want to use the project again:

1. Start Docker Desktop.
2. Start the Docker infrastructure.
3. Start Spring Boot.
4. Start the Python worker.
5. Start the React frontend.
6. Open `http://localhost:5173`.

No cloning is required again.

---

# 19. Infrastructure Verification

If you want to quickly verify that the supporting services are running:

### PostgreSQL

```powershell
docker exec utube-postgres pg_isready
```

### Redis

```powershell
docker exec utube-redis redis-cli ping
```

Expected:

```text
PONG
```

### RabbitMQ

```powershell
docker exec utube-rabbitmq rabbitmq-diagnostics -q ping
```

Expected:

```text
Ping succeeded
```

### Nginx

Open:

```text
http://localhost/health
```

---

# 20. Troubleshooting

### Docker containers are not running

```powershell
docker ps
```

If necessary:

```powershell
docker compose -f member4-infrastructure/docker/docker-compose.yml up -d
```

### Frontend dependencies are missing

```powershell
cd E:\Projects\UTube\Frontend
npm install
```

### Worker dependencies are missing

```powershell
cd E:\Projects\UTube\video-worker
pip install -r requirements.txt
```

### Worker is waiting for jobs

```text
Waiting for video processing jobs...
```

This means the worker is running and waiting for a video-processing message from RabbitMQ.

### Backend cannot connect to infrastructure

Verify Docker:

```powershell
docker ps
```

Then verify PostgreSQL, Redis, and RabbitMQ using the commands above.

---

# 21. Key Learning Outcomes

The project demonstrates practical implementation of:

- Full-stack web development
- React frontend development
- REST API development
- JWT authentication
- PostgreSQL database integration
- Redis caching
- RabbitMQ message queues
- S3-compatible object storage
- Asynchronous processing
- Python-based workers
- FFmpeg video transcoding
- HLS streaming
- Docker-based infrastructure
- Service-oriented system architecture
- Integration of multiple independent technologies

---

# 22. Final Architecture

```text
                              ┌──────────────┐
                              │     USER     │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    React     │
                              │    Vite      │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Nginx     │
                              └──────┬───────┘
                                     │
                                     ▼
                           ┌──────────────────┐
                           │   Spring Boot    │
                           │     Backend      │
                           └───┬────┬────┬────┘
                               │    │    │
                 ┌─────────────┘    │    └─────────────┐
                 ▼                  ▼                  ▼
          ┌────────────┐     ┌────────────┐     ┌─────────────┐
          │ PostgreSQL │     │   Redis    │     │  SeaweedFS  │
          └────────────┘     └────────────┘     └──────┬──────┘
                                                       │
                                                       │
                                                       ▼
                                                ┌────────────┐
                                                │  RabbitMQ  │
                                                └──────┬─────┘
                                                       │
                                                       ▼
                                                ┌────────────┐
                                                │   Python   │
                                                │   Worker   │
                                                └──────┬─────┘
                                                       │
                                                       ▼
                                                   ┌───────┐
                                                   │FFmpeg │
                                                   └───┬───┘
                                                       │
                                          ┌────────────┼────────────┐
                                          ▼            ▼            ▼
                                        360p         480p         720p
                                          └────────────┼────────────┘
                                                       ▼
                                                     HLS
                                                       │
                                                       ▼
                                                 SeaweedFS
                                                       │
                                                       ▼
                                                  hls.js
                                                       │
                                                       ▼
                                                Video Playback
```

---

# UTube

### A student-scale implementation of a modern video-sharing and video-processing platform.