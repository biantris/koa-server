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

it('should delete a event', async () => {
  const event = await createEvent({
    name: 'event A',
    start: '2022-01-01T00:00:00.000Z',
    end: '2022-01-01T23:59:59.000Z',
    allDay: true,
  });

  const query = `
    mutation M ($eventId: ID!) {
      EventDelete (input: { eventId: $eventId }) {
        eventId {
          id
        }
        error
        success
      }
    }
  `;

  const variables = {
    eventId: event.id,
  };

  const rootValue = {};

  const contextValue = { dataloaders: getDataloaders() };

  const result = await graphql(schema, query, rootValue, contextValue, variables);

  console.log(result.data);

  expect(result.errors).toBeUndefined();
  expect(result.data.EventDelete.error).toBeNull();
  
  expect(result.data.EventDelete.success).toBe('Event removed ;-;');
  expect(result.data.EventDelete.event).toBeDefined();

  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});