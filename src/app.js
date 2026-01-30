require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();



app.post("/signup", async(req,res) => {

  // Creating a new instance of the User Model
  const user = new User({
 
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error saving user: " + err.message)
  }


})


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


