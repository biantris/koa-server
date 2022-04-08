import { buildSchema } from 'graphql';

export default buildSchema(`
  type Event {
    id: ID
    title: String
    allDay: Boolean
    start: String
    end: String
  }
  type Query {
    listEvents: [Event]
  }
  type Mutation {
    createEvent(
      title: String!,
      start: String, 
      end: String, 
      allDay: Boolean): Event
  }
`);