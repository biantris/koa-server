import Event from '../models/event';

export function listEvents() {
  return Event.find();
}
export function createEvent(input) {
  const newEvent = new Event(input);
  return newEvent.save();
}