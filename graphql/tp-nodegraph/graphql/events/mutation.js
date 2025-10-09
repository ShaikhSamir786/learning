const { gql } = require("graphql-tag");

const EventMutation = gql`
  
  type Mutation {
    
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


module.exports = { EventMutation };
