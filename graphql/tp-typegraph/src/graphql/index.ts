import { userTypeDefs, userResolversMap } from '../graphql/user/index';

export const typeDefs = [
  
  ...userTypeDefs,
];

export const resolvers = {
  ...userResolversMap,

};