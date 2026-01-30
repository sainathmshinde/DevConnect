const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;

    if (!url) {
      throw new Error("MONGODB_URL is not defined");
    }

    await mongoose.connect(url, {
      dbName: "devConnects",
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err; // propagate to app.js
  }
};

module.exports = { connectDB };
