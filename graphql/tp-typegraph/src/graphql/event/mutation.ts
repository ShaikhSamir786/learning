// src/graphql/user/mutations.ts
import { gql } from 'graphql-tag';

export const userMutations = gql`
 type Mutation {
    createUser(name: String!, Email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }
`;

