import { GraphQLObjectType } from 'graphql';

import EventMutations from '../modules/event/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  ...EventMutations,
  }),
});

export default MutationType;