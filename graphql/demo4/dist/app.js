"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.js
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = Number(process.env.PORT) || 4000;
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
    { name: "abc", city: "xyz", book: books[0] },
    { name: "xyz", city: "abc", book: books[1] },
];
const resolvers = {
    Query: {
        books: () => books,
        users: () => users,
    },
};
const server = new server_1.ApolloServer({ typeDefs, resolvers });
await server.start();
const app = (0, express_1.default)();
// 👇 Use only one GraphQL endpoint
app.use("/graphql", body_parser_1.default.json(), (0, express5_1.expressMiddleware)(server));
app.listen(PORT, () => {
    console.log("🚀 GraphQL server ready at: http://localhost:4000/graphql");
});
//# sourceMappingURL=app.js.map