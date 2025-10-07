// index.js
import express from "express";
import { ApolloServer  } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from "body-parser";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    name: String
  }
  type User {
    name: String
    book : Book
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
  { name: "abc", city: "xyz"  , book: books[0]},
  { name: "xyz", city: "abc" , book: books[1]},
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
app.use("/graphql", bodyParser.json(), expressMiddleware(server));


app.listen(4000, () => {
  console.log("🚀 GraphQL server ready at: http://localhost:4000/graphql");
});
