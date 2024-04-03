const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { log } = require("console");
// configuration

const myConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "terravolt",
});
//test the connection
myConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});
//Query Method

const app = express();
//middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/Home", (req, res) => {
  res.render("home.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/learningCentre", (req, res) => {
  res.render("learningCentre.ejs");
});
app.get("/testimonials", (req, res) => {
  res.render("testimonials.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 5000");
});
