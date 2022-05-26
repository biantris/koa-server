import { graphql } from 'graphql';

import { toGlobalId } from 'graphql-relay';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '../../../../test';

import { getDataloaders } from "../../../graphql/loaderRegister";

import { schema } from '../../../schema/schema';

import { createEvent } from '../fixture/createEvent';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return a event infos', async () => {
  const event = await createEvent({
    name: 'event A',
    start: '2019-01-01T00:00:00.000Z',
    end: '2019-01-01T23:59:59.000Z',
    allDay: true,
  });

  // language=GraphQL
  const query = `
    query Q($id: ID!) {
      event: node (id: $id) {
        ... on Event {
          name
        }
      }
    }
  `;

  const globalId = toGlobalId("Event", event._id);

  const variables = {
    id: globalId,
  };

  const rootValue = {};

  const contextValue = { dataloaders: getDataloaders() }

  const result = await graphql(schema, query, rootValue, contextValue, variables);

  console.log(result.data)
  expect(result.errors).toBeUndefined();
  expect(result.data.event.name).toBe(event.name);
});
