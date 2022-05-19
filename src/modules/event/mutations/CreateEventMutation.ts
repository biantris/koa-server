import { GraphQLNonNull, GraphQLID } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField, getObjectId } from "@entria/graphql-mongo-helpers";

import EventModel from '../../event/EventModel';

import * as EventLoader from '../../event/EventLoader';

import EventType from '../../event/EventType';

type Args = {
  event: string;
};
const mutation = mutationWithClientMutationId({
  name: 'Create event',
  inputFields: {
    event: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async (args: Args) => {

    const event = await EventModel.findOne({
      _id: getObjectId(args.event),
    });

    if (!event) {
      return {
        error: 'event not found',
      };
    }

  },
  outputFields: {
    event: {
      type: EventType,
      resolve: async ({ id }, _, context) => {
        return await EventLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;