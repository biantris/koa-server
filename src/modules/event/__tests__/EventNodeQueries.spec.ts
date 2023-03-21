import { graphql } from 'graphql';

import { toGlobalId } from 'graphql-relay';

import { getDataloaders } from '../../../graphql-helpers/loaderRegister';

import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  sanitizeTestObject,
} from '../../../../test';

import { schema } from '../../../schema/schema';

import EventModel from '../EventModel';
import { createEvent } from '../fixture/createEvent';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

// fix this
it.skip('should return a event infos by id', async () => {
  const event = await createEvent({
    name: 'event A',
    start: '2019-01-01T00:00:00.000Z',
    end: '2019-01-01T23:59:59.000Z',
    allDay: true,
  });

  await EventModel.findOneAndUpdate(
    {
      _id: event._id,
    },
    {
      $set: {
        event: event._id,
      },
    }
  );

  // language=GraphQL
  const query = /* GraphQL */ `
    query EventNodeQueriesQuery($id: ID!) {
      event: node(id: $id) {
        ... on Event {
          name
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    id: toGlobalId('Event', event._id),
  };

  const context = { dataloaders: getDataloaders() };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue: context,
    variableValues: variables,
  });

  console.log('RESULT', result.data?.event);

  expect(result.errors).toBeUndefined();
  expect(result.data.event.name).toBe(event.name);

  expect(sanitizeTestObject(result.data)).toMatchSnapshot;
});
