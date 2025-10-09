import { userTypeDefs, userResolversMap } from '../graphql/users/index';

export const typeDefs = [
  
  ...userTypeDefs,
];

export const resolvers = {
  ...userResolversMap,

};