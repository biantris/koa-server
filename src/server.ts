import connectDB from './database/database';
import { createServer } from "http";
import app from "./app";

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Unable to connect to database");
    process.exit(1);
  }

  const server = createServer(app.callback());

  server.listen(9000, () => console.log('Server running 🚀'));
})();
