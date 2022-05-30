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
import { toGlobalId } from 'graphql-relay';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should update a event', async () => {
  const event = await createEvent({
    name: 'event A',
    start: '2022-01-01T00:00:00.000Z',
    end: '2022-01-01T23:59:59.000Z',
    allDay: true,
  });

  const query = `
    mutation M ($eventId: ID!, $name: String!, $start: String!, $end: String!, $allDay: Boolean!) {
      EventUpdate (input: { eventId: $eventId, name: $name, start: $start, end: $end, allDay: $allDay }) {
        event {
          id
          name
          start
          end
          allDay
        }
        error
        success
      }
    }
  `;

  const variables = {
    eventId: toGlobalId("Event", event._id),
    name: 'event B',
    start: '2022-01-02T00:00:00.000Z',
    end: '2022-01-02T23:59:59.000Z',
    allDay: false,
  };

  const rootValue = {};

  const contextValue = { dataloaders: getDataloaders() };

  const result = await graphql(schema, query, rootValue, contextValue, variables);

  console.log(result.data.EventUpdate);

  expect(result.errors).toBeUndefined();
  expect(result.data.EventUpdate.error).toBeNull();
  
  expect(result.data.EventUpdate.success).toBe('Event updated /o/');
  
  expect(result.data.EventUpdate.event.name).toBe('event B');
  expect(result.data.EventUpdate.event.start).toBe('2022-01-02T00:00:00.000Z');
  expect(result.data.EventUpdate.event.end).toBe('2022-01-02T23:59:59.000Z');
  expect(result.data.EventUpdate.event.allDay).toBe(false);

  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});