import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  start: {
    type: Date,
    required: "Start is required",
  },
  end: {
    type: Date,
    required: "End is required",
  },
  allDay: {
    type: Boolean,
    required: "AllDay is required",
  },
});

export interface IEvent extends Document {
  name: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

const EventModel: Model<IEvent> = mongoose.model("Event", EventSchema);

export default EventModel;