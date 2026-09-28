# Redis

Redis is used as the UTube cache layer.

Internal hostname:

`redis`

Internal port:

`6379`

Example backend configuration:

```text
REDIS_HOST=redis
REDIS_PORT=6379
```

Example values that may eventually be cached:

- popular video metadata
- frequently requested video details
- search results
- session-related temporary data

The exact caching strategy belongs to the backend member.
