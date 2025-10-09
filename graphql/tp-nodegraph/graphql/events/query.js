const { gql } = require("graphql-tag");

const EventQuery = gql`
  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }
`;

module.exports = { EventQuery };
