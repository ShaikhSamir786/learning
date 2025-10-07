// index.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1️⃣ Define your GraphQL schema (type definitions)
const typeDefs = `#graphql
  # A Book type with title and author fields
  type Book {
    title: String
    author: String
    name : String
  }
type user{
name : String
city : String
}

  # The root Query type - entry point for all read operations
  type Query {
    books: [Book]
    users : [user]
  }
`;

// 2️⃣ Provide some sample data (like a mock database)
const books = [
  { title: "The Awakening", author: "Kate Chopin" , name :"abc" },
  { title: "City of Glass", author: "Paul Auster" , name :"xyz "},
];

const users = [
  { name: "abc", city: "xyz" },
  { name: "xyz", city: "abc" },
];

// 3️⃣ Define resolver functions to tell GraphQL how to fetch the data
const resolvers = {
  Query: {
    books: () => books, // when 'books' query is called, return the array
    users: () => users, // when 'users' query is called, return the array
  },
};

// 4️⃣ Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 5️⃣ Start the server on port 4000
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL server ready at: ${url}`);
