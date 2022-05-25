import { createLoader } from "@entria/graphql-mongo-helpers";

import EventModel from "./EventModel";

import { eventFilterMapping } from "./EventFilterInputType";

import { registerLoader } from "../../graphql/loaderRegister";

const {
  Wrapper: Event,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: EventModel,
  loaderName: "EventLoader",
  filterMapping: eventFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Event;

registerLoader("EventLoader", getLoader);