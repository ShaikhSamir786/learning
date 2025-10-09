// src/graphql/user/queries.ts
import { gql } from 'graphql-tag';

export const userQueries = gql`
  type Query {
    users: [User!]!
  }
`;
