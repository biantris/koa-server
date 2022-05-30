import { GraphQLNonNull, GraphQLID } from 'graphql';

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from "@entria/graphql-mongo-helpers";

import EventModel from '../EventModel';

import * as EventLoader from '../EventLoader';

import EventType from '../EventType';

const mutation = mutationWithClientMutationId({
  name: 'EventDelete',
  description: "Delete a Event",
  inputFields: {
    eventId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ eventId }) => {
    
    const { id } = fromGlobalId(eventId)
    
    const event = await EventModel.findById({ _id: id }); // find event by id

    if (!event) {
      return {
        error: 'Event not found', // return error if no exists
      };
    }

    await EventModel.deleteOne({ _id: id }); // delete by id

    return {
      id: eventId,
      error: null,
      success: 'Event removed ;-;',
    };
  },

  outputFields: {
    eventId: {
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