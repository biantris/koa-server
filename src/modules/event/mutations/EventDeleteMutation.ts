import { GraphQLNonNull, GraphQLID } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import {
  errorField,
  successField,
  getObjectId,
} from '@entria/graphql-mongo-helpers';

import EventModel from '../EventModel';

const mutation = mutationWithClientMutationId({
  name: 'EventDelete',
  description: 'Delete a Event',
  inputFields: {
    eventId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ eventId }) => {
    const event = await EventModel.findById({
      _id: getObjectId(eventId), // find event by id
    });

    if (!event) {
      return {
        error: 'Event not found', // return error if no exists
      };
    }

    await EventModel.deleteOne({
      _id: getObjectId(eventId), // delete by id
    });

    return {
      id: eventId._id,
      error: null,
      success: 'Event removed ;-;',
    };
  },

  outputFields: {
    eventId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
