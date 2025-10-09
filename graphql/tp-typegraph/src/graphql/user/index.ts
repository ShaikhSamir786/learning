// src/graphql/user/index.ts
import { userTypes } from './type';
import { userQueries } from './quries';
import { userMutations } from './mutation';
import { resolvers } from './resolver';

export const userTypeDefs = [userTypes, userQueries, userMutations];
export const userResolversMap = resolvers;
 
