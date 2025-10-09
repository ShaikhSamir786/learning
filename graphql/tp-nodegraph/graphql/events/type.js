
const {gql} = require("graphql-tag")


const userTypes = gql`
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  verified: Boolean!
  isActive: Boolean!
}`;

module.exports = userTypes