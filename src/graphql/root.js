const Event = require('../models/event');

module.exports = {
  listEvents() {
    return Event.find();
  },
  createEvent(input) {
    const newEvent = new Event(input);
    return newEvent.save();
  },
}