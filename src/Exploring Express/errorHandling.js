const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  console.log("api started");
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.get("/getUserData", (req, res) => {
  console.log("api1 started");

  try {
    //DB Call logic here

    throw new Error("Error throw");
    res.send("User data fetched");
  } catch (err) {
    res.status(500).send("Failed to fetch user data");
  }
});

app.get("/user", async (req, res, next) => {
  try {
    throw new Error("Async error");
  } catch (err) {
    next(err);
  }
});
app.use("/", (err, req, res, next) => {
  console.log("api started");
  if (err) {
    res.status(500).send("Something1 Went Wrong");
  }
});

app.listen(8080, (req, res) => {
  console.log("Servere started for error handling");
});
