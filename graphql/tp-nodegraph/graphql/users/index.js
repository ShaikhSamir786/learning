const { userMutation } = require("./mutation");
const { userQuries } = require("./query");
const { userResolvers } = require("./resolver");
const { userTypes } = require("./type");

const userTypedefMap = [userTypes, userMutation, userQuries];

const userResolverMap = userResolvers;

module.exports = { userTypedefMap, userResolverMap };
