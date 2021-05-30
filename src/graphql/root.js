const Event = require('../models/event');

module.exports = {
  listEvents() {
    return Event.find();
  },
}