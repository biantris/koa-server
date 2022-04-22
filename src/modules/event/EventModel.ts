import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  allDay: Boolean,
});

export interface IEvent extends Document {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

const EventModel: Model<IEvent> = mongoose.model("Event", EventSchema);

export default EventModel;