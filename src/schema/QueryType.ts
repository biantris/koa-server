import { GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { connectionArgs } from '../graphql-helpers/connectionDefinitions';

import * as EventLoader from '../modules/event/EventLoader';
import { EventConnection } from '../modules/event/EventType';
import { nodeField, nodesField } from '../modules/node/typeRegister';

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
      resolve: async (_, args, context) =>
        await EventLoader.loadAll(context, args),
    },
  }),
});

export default QueryType;
