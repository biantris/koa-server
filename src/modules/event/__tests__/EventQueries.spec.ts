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

it("should query all events", async () => {
  const event = await createEvent({
    name: "Event",
    start: "2019-01-01T00:00:00.000Z",
    end: "2019-01-01T23:59:59.000Z",
    allDay: true,
  });

  const anotherEvent = await createEvent({
    name: "Another Event",
    start: "2019-01-02T00:00:00.000Z",
    end: "2019-01-02T23:59:59.000Z",
    allDay: false,
  });

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

  expect(result.data.events.edges[0].node.name).toBe(event.name);
  expect(result.data.events.edges[1].node.name).toBe(anotherEvent.name);

  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});
