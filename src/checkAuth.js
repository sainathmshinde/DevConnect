const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User Auth Checked and return user data");
});

app.post("/user/userData", (req, res) => {
  res.send("User Logged in succefully");
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
