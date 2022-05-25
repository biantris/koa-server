import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

import { globalIdField } from "graphql-relay";

import { connectionDefinitions } from "../../graphql";

import { load } from "./EventLoader";

import { nodeInterface, registerTypeLoader } from "../node/typeRegister";

const EventType = new GraphQLObjectType({
  name: "Event",
  description: "event data",
  fields: () => ({
    id: globalIdField("Event"),
    name: {
      type: GraphQLString,
      resolve: event => event.name,
    },
    start: {
        type: GraphQLString,
        resolve: event => event.start,
    },
    end: {
        type: GraphQLString,
        resolve: event => event.end,
    },
    allDay: {
        type: GraphQLBoolean,
        resolve: event => event.allDay,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(EventType, load);

export default EventType;

export const EventConnection = connectionDefinitions({
  name: "Event",
  nodeType: EventType,
});