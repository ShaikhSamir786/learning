import gql from "graphql-tag";

export const typeDefs = gql`
  # --- 1. Define Custom Directives ---
  # @auth: Requires a user to have a certain role to access a field or mutation.
  directive @auth(role: Role = USER) on FIELD_DEFINITION | OBJECT

  # @upper: Converts a String field's output to uppercase.
  directive @upper on FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  # --- 2. Apply Directives to Schema Elements ---

  type Event {
    id: ID!
    # @upper directive: Ensures the title is always returned in uppercase.
    title: String! @upper 
    description: String
    createdAt: String!
    
    # @deprecated directive: Mark a field for removal (standard GraphQL directive).
    oldId: String @deprecated(reason: "Use the 'id' field instead.")
  }

  type Query {
    # @auth directive: Restrict the main query to authenticated users.
    events: [Event!]! @auth(role: USER)
  }

  type Mutation {
    # @auth directive: Restrict creating events to users with the ADMIN role.
    createEvent(title: String!, description: String): Event! @auth(role: ADMIN)
  }

  # Subscriptions typically don't need field-level authorization since 
  # the subscription setup itself is usually protected by middleware.
  type Subscription {
    eventCreated: Event!
  }
`;