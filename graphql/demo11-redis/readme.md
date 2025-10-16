
---

````markdown

* **Redis CLI** → `localhost:6379`
* **RedisInsight UI** → [http://localhost:8001](http://localhost:8001)

---

## 📋 Command Summary

| Purpose                    | Command                                                                               | Description                                                          |
| -------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Run Redis Stack**        | `docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest` | Starts a Redis Stack container with Redis and RedisInsight UI.       |
| **Open Redis CLI**         | `docker exec -it redis-stack redis-cli`                                               | Opens the Redis command-line interface inside the running container. |
| **Subscribe to Event**     | `SUBSCRIBE EVENT_CREATED`                                                             | Subscribes to the `EVENT_CREATED` channel to listen for events.      |
| **Access Container Shell** | `docker exec -it 58ba0ae77d9f /bin/bash`                                              | Opens a Bash shell inside the container (use your container ID).     |
| **Stop Container**         | `docker stop redis-stack`                                                             | Stops the running Redis Stack container.                             |
| **Remove Container**       | `docker rm redis-stack`                                                               | Removes the stopped Redis Stack container.                           |

---

## 📰 Event Subscription Example

1. Open Redis CLI inside the container:

   ```bash
   docker exec -it redis-stack redis-cli
   ```

2. Subscribe to an event:

   ```bash
   SUBSCRIBE EVENT_CREATED
   ```

---

## 🧹 Clean Up

To stop and remove the container:

```bash
docker stop redis-stack
docker rm redis-stack
```
