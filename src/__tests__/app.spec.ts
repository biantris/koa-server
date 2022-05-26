import request from 'supertest';
import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '../../test';
import app from '../app';
import { createEvent } from '../modules/event/fixture/createEvent';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return 200', async () => {
  const event = await createEvent({
    name: 'event',
    start: '2019-01-01T00:00:00.000Z',
    end: '2019-01-01T23:59:59.000Z',
    allDay: true,
  });

  // language=GraphQL
  const query = `
    query Q {
      events {
        edges {
          node {
            name
            start
            end
            allDay
          }
        }
      }      
    }
  `;

  const variables = {};

  const payload = {
    query,
    variables,
  };

  const response = await request(app.callback())
    .post('/graphql')
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    .send(JSON.stringify(payload));

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
