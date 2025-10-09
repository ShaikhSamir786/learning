const { EventMutation } = require("./mutation");
const { EventQuery } = require("./query");
const { EventType } = require("./type");
const { Eventresolvers } = require("./resolver");

const EventtypedefMAp = [EventType, EventQuery, EventMutation];

const EventresolverMap = Eventresolvers;

module.exports = {
  EventtypedefMAp,
  EventresolverMap,
};
