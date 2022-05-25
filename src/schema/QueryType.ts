import { GraphQLObjectType, GraphQLNonNull } from 'graphql';

import { connectionArgs } from "../graphql/connectionDefinitions";

import { nodesField, nodeField } from '../modules/node/typeRegister';
import * as EventLoader from '../modules/event/EventLoader';
import { EventConnection } from '../modules/event/EventType';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    events: {
      type: new GraphQLNonNull(EventConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => await EventLoader.loadAll(context, args),
    },
  }),
});

export default QueryType;
