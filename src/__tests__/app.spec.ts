import request from 'supertest';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
} from '../../test';
import app from '../app';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return 200', async () => {
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
