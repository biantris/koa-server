import { graphql } from "graphql";

import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  sanitizeTestObject,
} from "../../../../test";

import { schema } from "../../../schema/schema";

import { createEvent } from "../fixture/createEvent";

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it("should all events", async () => {
  const event = await createEvent();
  const anotherEvent = await createEvent();

  // language=GraphQL
  const query = `
    query Q {
      events(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  `;

  const rootValue = {};
  //const contextValue = await getContext({});
  const variableValues = {};

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    //contextValue,
    variableValues,
  });

  expect(result.errors).toBeUndefined();

  // eslint-disable-next-line
  console.log("result: ", result.data.events);
  expect(result.data.events.edges.length).toBe(2);
  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});
