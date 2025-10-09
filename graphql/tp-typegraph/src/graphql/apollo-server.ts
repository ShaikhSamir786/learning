// src/graphql/createApolloServer.ts
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from './index';

export const buildSchema = () => {
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

export const createApolloServer = (schema: any) => {
  return new ApolloServer({ schema });
};
