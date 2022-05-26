import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from "@entria/graphql-mongo-helpers";

import EventModel from '../EventModel';

import * as EventLoader from '../EventLoader';

import EventType from '../EventType';

const mutation = mutationWithClientMutationId({
  name: 'CreateEvent',
  description: "Create a new Event",
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

    const event = await new EventModel({eventId, name, start, end, allDay}).save();

    if (!event) {
      return {
        error: 'Event not found',
      };
    }

    return {
      error: null,
      success: 'Event created \o/',
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