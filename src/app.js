const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Test");
});

app.use("/hello", (req, res) => {
  res.send("Hello");
});
app.use("/new", (req, res) => {
  res.send("New");
});
app.use("/", (req, res) => {
  res.send("Hello from Dashboard!113");
});

app.listen(8080, () => {
  console.log("Server connected to port number 8080");
});
