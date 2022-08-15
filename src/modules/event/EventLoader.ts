
import EventModel from "./EventModel";

import { createLoader } from "../../graphql";
import { eventFilterMapping } from "./EventFilterInputType";
import { registerLoader } from "../../graphql/loaderRegister";

const {
  Wrapper: Event,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  //@ts-ignore
  model: EventModel,
  loaderName: "EventLoader",
  filterMapping: eventFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Event;

registerLoader("EventLoader", getLoader);