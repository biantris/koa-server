import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';

import { getObjectId } from "@entria/graphql-mongo-helpers";

export const eventFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  post: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const EventFilterInputType = new GraphQLInputObjectType({
  name: 'EventFilter',
  description: 'Used to filter events',
  fields: () => ({
    event: {
      type: GraphQLID,
    },
  }),
});

export default EventFilterInputType;