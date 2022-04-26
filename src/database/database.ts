import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(`mongodb://localhost/graphql-crud`, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Database connected ✅"));
};

export default connectDB;