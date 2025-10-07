// index.js
import express from "express";
import { ApolloServer  } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    name: String
  }
  type User {
    name: String
    city: String
  }

  type Query {
    books: [Book]
    users: [User]
  }
`;

const books = [
  { title: "The Awakening", author: "Kate Chopin", name: "abc" },
  { title: "City of Glass", author: "Paul Auster", name: "xyz" },
];

const users = [
  { name: "abc", city: "xyz" },
  { name: "xyz", city: "abc" },
];

const resolvers = {
  Query: {
    books: () => books,
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const app = express();

// 👇 Use only one GraphQL endpoint
app.use("/graphql", bodyParser.json(), server.getMiddleware());

app.listen(4000, () => {
  console.log("🚀 GraphQL server ready at: http://localhost:4000/graphql");
});
