import connectDB from './database/database';
import dotenv from "dotenv";
import { createServer } from "http";
import { environment, serverConf } from "./shared";
import app from "./app";

(async () => {
  dotenv.config();
  // starting db
  try {
    await connectDB();
  } catch (error) {
    console.error("Unable to connect to database");
    process.exit(1);
  }

  const server = createServer(app.callback());

  server.listen(process.env.PORT, () => console.log('Server running 🚀'));
  console.log(
    `App running on ${environment.toUpperCase()} mode and listening on port ${
      serverConf.SERVER_PORT
    } ...`
  );
  console.log(
    `GraphQL Server is now running on http://localhost:${process.env.PORT}/graphql`
  );
})();
