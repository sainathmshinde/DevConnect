const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
  res.send("User data clicked");
});

app.get("/admin/getData", (req, res) => {
  res.send("Admin auth checked and send all admin data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User deleted successfully");
});

app.listen(8080, (req, res) => {
  console.log("Auth check server started");
});
