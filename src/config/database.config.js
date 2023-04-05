import mongoose from "mongoose";

const uri = process.env.URI || "mongodb://localhost:27017";
console.log(uri);
const initDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (e) {
    console.log("oh oh problem : ", e.message);
  }
};

export default initDb;
