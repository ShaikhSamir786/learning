const {userResolverMap,userTypedefMap} = require("./users/index")
const {EventresolverMap , EventtypedefMAp} = require("./events/index")
const { DateTimeResolver, DateTimeTypeDefinition } = require("graphql-scalars");


 const typeDefs = [
  DateTimeTypeDefinition,
  ...userTypedefMap,
  ...EventtypedefMAp
];

const resolvers = {
  DateTime:DateTimeResolver,
  ...userResolverMap,
  ...EventresolverMap

};

module.exports ={
  typeDefs , 
  resolvers
}