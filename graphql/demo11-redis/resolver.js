
import { publishEvent, EVENT_CREATED } from "./pubsub.js";

let events = [];



// --- Core Resolvers ---
export const resolvers = {

  Query: {
    events: () => events,
  },

  Mutation: {
    createEvent: async (_, { title, description }) => {
      const newEvent = {
        id: String(events.length + 1), 
        title,
        description: description || '',
        createdAt: new Date().toISOString(),
      };
      events.push(newEvent);

       await publishEvent(EVENT_CREATED, { eventCreated: newEvent });

      console.log(`📢 New event created: ${newEvent.title}`);
      return newEvent;
    },
  },

  Subscription: {
    eventCreated: {
      subscribe: (_, __, ctx) => {
        return ctx.pubsub.asyncIterator([EVENT_CREATED]); 
      },
    },
  },
};


