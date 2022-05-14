import Event, { IEvent } from "../EventModel";
import { getCounter } from "../../../../test";
import { DeepPartial } from "../../../../test/deepPartial";

export const createEvent = (args: DeepPartial<IEvent> = {}) => {
  const i = getCounter("event");

  let { start, end, ...payload } = args;

  if (start === undefined) {
    start = `2019-01-0${i}T00:00:00.000Z`;
  }

  if (end === undefined) {
    end = `2019-01-0${i}T00:00:00.000Z`;
  }

  return new Event({
    name: `event#${i}`,
    start,
    end,
    ...payload,
  }).save();
};