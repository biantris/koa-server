import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  allDay: Boolean
});

export default model('Event', EventSchema);