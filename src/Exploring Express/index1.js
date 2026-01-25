const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  //Route Handler
  res.send("Get User Successfully");
});

app.post("/user", (req, res) => {
  res.send("User Created");
});

app.delete("/user", (req, res) => {
  res.send("User Created");
});

app.get("/users", (req, res) => {
  // res.send("route Handler Called")
  // If we didnt call rout handleer and with res send then api call in postman goes calling too long and time Out
  // because We havn't pass any res
});

app.listen(8080, () => {
  console.log("Server connected to port number 8080");
});
