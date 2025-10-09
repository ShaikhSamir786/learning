// src/graphql/user/types.ts
import { gql } from 'graphql-tag';

export const userTypes = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }
`;
