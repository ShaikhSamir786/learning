// src/graphql/createApolloServer.ts
const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./index");

const buildSchema = () => {
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

const createApolloServer = (schema) => {
  return new ApolloServer({ schema });
};

module.exports = {
  buildSchema,
  createApolloServer,
};
