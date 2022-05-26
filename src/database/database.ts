import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = () => {
  mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Database connected ✅"));
};