// pubsub.js
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

const options = {
  host: "127.0.0.1",
  port: 6379,
};

const publisher = new Redis(options);
const subscriber = new Redis(options);

export const pubsub = new RedisPubSub({
  publisher,
  subscriber,
});

export const EVENT_CREATED = "EVENT_CREATED";

// 🧩 Redis Stream name (for visibility in RedisInsight)
const STREAM_KEY = "event_stream";

// 🧩 Helper: publish both to Pub/Sub + Stream
export const publishEvent = async  (channel, payload) => {
  // 1️⃣ Normal GraphQL publish
  await pubsub.publish(channel, payload);

  // 2️⃣ Also write to Redis Stream
  await publisher.xadd(
    STREAM_KEY,
    "*", // auto ID
    "channel", channel,
    "payload", JSON.stringify(payload)
  );

  console.log(`🧾 Logged event in stream "${STREAM_KEY}"`);
}
