const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (MONGODB_URI) => {

  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}`
    );
    console.log(`MongoDB connected`, connectionInstance.connection.host);
  } catch (error) {
    console.log("MongoDb Connection Error", error);
  }
};

module.exports = { connectDB };
