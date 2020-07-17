import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI_DEV;
  try {
    const conn = await mongoose.connect(mongoUri!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: - ${err.message}`);
  }
};

export default connectDB;
