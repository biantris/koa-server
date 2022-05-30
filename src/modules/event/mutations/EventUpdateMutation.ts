import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';

import EventModel from '../EventModel';

import * as EventLoader from '../EventLoader';

import EventType from '../EventType';

const mutation = mutationWithClientMutationId({
  name: 'EventUpdate',
  description: 'Update a Event',
  inputFields: {
    eventId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    start: {
      type: new GraphQLNonNull(GraphQLString),
    },
    end: {
      type: new GraphQLNonNull(GraphQLString),
    },
    allDay: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  mutateAndGetPayload: async ({ eventId, name, start, end, allDay }) => {
    const event = await EventModel.findById({
      _id: getObjectId(eventId),
      name,
      start,
      end,
      allDay,
    });

    if (!event) {
      return {
        error: 'Event not found',
      };
    }

    await EventModel.updateOne(
      { 
        _id: getObjectId(eventId)
      },
      {
        $set: {
          name,
          start,
          end,
          allDay,
        },
      },
    );

    return {
      id: event._id,
      error: null,
      success: 'Event updated /o/',
    };
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