const {gql} =require("graphql-tag")


const EventType =gql`
type Event {
    id: ID!
    title: String!
    description: String
    date: DateTime!
    location: String!
    createdBy: User!
    invitedEmails: [String!]!
  }`;

  module.exports = {EventType}