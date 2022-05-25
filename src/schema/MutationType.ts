import { GraphQLObjectType } from 'graphql';

import EventMutations from '../modules/event/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: "Root of ... mutations",
  fields: () => ({
    ...EventMutations,
  }),
});