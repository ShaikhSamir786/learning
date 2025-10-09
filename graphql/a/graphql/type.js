

const typeDefs = `
  scalar DateTime

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    verified: Boolean!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Event {
    id: ID!
    title: String!
    description: String
    date: DateTime!
    location: String!
    createdBy: User!
    invitedEmails: [String!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): String! # returns JWT
    createEvent(
      title: String!
      description: String
      date: DateTime!
      location: String!
      invitedEmails: [String!]
    ): Event!


    updateEvent(
      eventId: ID!
      title: String
      description: String
      date: DateTime
      location: String
      invitedEmails: [String!]
    ): Event!
    deleteEvent(eventId: ID!): Boolean!
  }
`;

module.exports = {typeDefs};
