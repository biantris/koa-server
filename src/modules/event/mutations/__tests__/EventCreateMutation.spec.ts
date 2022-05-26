import { graphql } from 'graphql';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  sanitizeTestObject,
} from '../../../../../test';

import { createEvent } from '../../fixture/createEvent';

import { getDataloaders } from '../../../../graphql/loaderRegister';

import { schema } from '../../../../schema/schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should create a new event', async () => {
  const event = await createEvent({
    name: 'event A',
    start: '2019-01-01T00:00:00.000Z',
    end: '2019-01-01T23:59:59.000Z',
    allDay: true,
  });

  const query = `
    mutation M ($eventId: ID!, $name: String!, $start: String!, $end: String!, $allDay: Boolean!) {
      EventCreate (input: { eventId: $eventId, name: $name, start: $start, end: $end, allDay: $allDay }) {
        event {
          id
          name
          start
          end
          allDay
        }
        error
      }
    }
  `;

  const variables = {
    eventId: event.id,
    name: event.name,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
  };

  const rootValue = {};

  const contextValue = { dataloaders: getDataloaders() };

  const result = await graphql(schema, query, rootValue, contextValue, variables);

  expect(result.errors).toBeUndefined();
  expect(result.data.CreateEvent.error).toBeNull();

  expect(result.data.CreateEvent.event).toBeDefined();

  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});
