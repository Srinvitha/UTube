# RabbitMQ

RabbitMQ is the asynchronous messaging layer between the backend and video
processing worker.

## Connection

Inside Docker:

```text
Host: rabbitmq
Port: 5672
```

Management UI:

```text
http://localhost:15672
```

## Queues

```text
video.processing
video.completed
video.failed
```

## Flow

```text
Spring Boot
    |
    | publish
    v
video.processing
    |
    v
Python Worker
    |
    +----> video.completed
    |
    +----> video.failed
```

Messages are JSON.

The queue names and message fields should remain stable once integration begins.
