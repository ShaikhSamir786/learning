// index.js
import express from "express";
import { ApolloServer  } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from "body-parser";
import { prisma } from './sb.js'

const PORT = Number(process.env.PORT) || 4000;
const app = express();

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    name: String!
  }

  type User {
    name: String
    city: String
    book: Book
  }

  type Mutation {
    createBook(title: String!, name: String!): Book
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
  Mutation: {
    createBook: async (_parent, args) => {
      const { title , name } = args;
      const newBook = await prisma.books.create({
        data: {
          title,
          name,
        },
      });
      return newBook;
    },
  },
};
 

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();



// 👇 Use only one GraphQL endpoint
app.use("/graphql", bodyParser.json(), expressMiddleware(server));


app.listen(PORT, () => {
  console.log("🚀 GraphQL server ready at: http://localhost:4000/graphql");
});
