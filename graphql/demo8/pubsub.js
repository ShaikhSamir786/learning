import { PubSub } from "graphql-subscriptions";

// Create a single instance
export const pubsub = new PubSub();

console.log('pubsub', typeof pubsub.asyncIterator); // should be 'function'

// Event name constant
export const EVENT_CREATED = 'EVENT_CREATED';