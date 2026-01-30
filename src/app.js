require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("Database connection established");

    app.listen(8080, () => {
      console.log("Server is successfully listening on port 8080...");
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
