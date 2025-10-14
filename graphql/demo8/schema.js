import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String
    createdAt: String!
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    createEvent(title: String!, description: String): Event!
  }

  type Subscription {
    eventCreated: Event!
  }
`;
