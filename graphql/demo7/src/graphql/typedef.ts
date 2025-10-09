
export const typeDefs = `#graphql
  directive @rateLimit(
    window: String!
    max: Int!
    message: String
  ) on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]! @rateLimit(window: "10s", max: 5, message: "Too many requests for users list")
  }

  type Mutation {
    createUser(name: String!, Email: String!): User! @rateLimit(window: "1m", max: 3, message: "Wait before creating more users")
    updateUser(id: ID!, name: String, email: String): User! @rateLimit(window: "30s", max: 5)
    deleteUser(id: ID!): Boolean! @rateLimit(window: "1m", max: 2)
  }
`;
