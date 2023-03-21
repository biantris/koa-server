import EventModel from './EventModel';

import { createLoader } from '../../graphql-helpers';
import { registerLoader } from '../../graphql-helpers/loaderRegister';
import { eventFilterMapping } from './EventFilterInputType';

const {
  Wrapper: Event,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  //@ts-ignore
  model: EventModel,
  loaderName: 'EventLoader',
  filterMapping: eventFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Event;

registerLoader('EventLoader', getLoader);
