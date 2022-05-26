import { connectDB } from '../src/database/database';
import Event from '../src/modules/event/EventModel';

const N = 5;

(async () => {
  await connectDB ();

  const total = await Event.countDocuments();

  const arr = Array.from(Array(N).keys());

  for (const i of arr) {
    const n = total + i + 1;

    await new Event({
      name: `event#${n}`,
      start:`2019-01-0${n}T00:00:00.000Z`,
      end: `2019-01-0${n}T23:59:59.000Z`,
      allDay: true,
    }).save();
  }

  // eslint-disable-next-line
  console.log(`${N} events created`);

  process.exit(0);
})();