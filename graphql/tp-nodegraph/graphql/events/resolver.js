const { gql } = require("graphql-tag");

const Eventresolvers = {
  Query: {
    events: async () => await Event.findAll({ include: ["creator"] }),
    event: async (_, { id }) =>
      await Event.findByPk(id, { include: ["creator"] }),
  },

  Mutation: {
    createEvent: async (
      _,
      { title, description, date, location, invitedEmails },
      { userId }
    ) => {
      if (!userId) throw new Error("Unauthorized");
      return await Event.create({
        title,
        description,
        date,
        location,
        createdBy: userId,
        invitedEmails,
      });
    },

    updateEvent: async (_, { eventId, ...data }, { userId }) => {
      const event = await Event.findByPk(eventId);
      if (!event) throw new Error("Event not found");
      if (event.createdBy !== userId) throw new Error("Not authorized");
      await event.update(data);
      return event;
    },

    deleteEvent: async (_, { eventId }, { userId }) => {
      const event = await Event.findByPk(eventId);
      if (!event) throw new Error("Event not found");
      if (event.createdBy !== userId) throw new Error("Not authorized");
      await event.destroy();
      return true;
    },
  },
  Event: {
    createdBy: async (event) => await User.findByPk(event.createdBy),
  },
};

module.exports = { Eventresolvers };
