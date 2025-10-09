
const {gql} = require("graphql-tag")

const userQuries = gql` type Query {
    users: [User!]!
    user(id: ID!): User
 
    
    
  }`;

  module.exports= { userQuries }