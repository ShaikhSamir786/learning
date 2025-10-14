import { pubsub, EVENT_CREATED } from "./pubsub.js";

let events = [];

export const resolvers = {
  Query: {
    events: () => events,
  },

  Mutation: {
    createEvent: async (_, { title, description }) => {
      const newEvent = {
        id: String(events.length + 1), // Convert to string for ID type
        title,
        description : description || '',
        createdAt: new Date().toISOString(),
      };
      events.push(newEvent);

      // Publish the event
      await pubsub.publish(EVENT_CREATED, { eventCreated: newEvent });

      console.log(`📢 New event created: ${newEvent.title}`);
      return newEvent;

    
    },
  },

  Subscription: {
    eventCreated: {
      subscribe: (_, __, ctx) => {
        // console.log('ctx', ctx);
        return ctx.pubsub.asyncIterableIterator([EVENT_CREATED]); // Pass as array
      },
    },
  },
};