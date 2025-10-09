
const {gql} = require("graphql-tag")

const userMutation = gql` 
type Mutation{
    users: [User!]!
    user(id: ID!): User
 
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): User!

    
    loginUser(email: String!, password: String!): String! 
    
  }`;

  module.exports= { userMutation }