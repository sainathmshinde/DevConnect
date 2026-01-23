const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("Get User Successfully");
});

app.post("/user", (req, res) => {
  res.send("User Created");
});

app.delete("/user", (req, res) => {
  res.send("User Created");
});

app.listen(8080, () => {
  console.log("Server connected to port number 8080");
});
