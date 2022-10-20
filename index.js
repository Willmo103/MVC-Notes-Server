//-------// Imports \\
const { json } = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const Note = require("./models/note");
const oauth = require("./authorize").authorize;
const { loginUser } = require("./controllers/user");
const { getUserNotes, createNote } = require("./controllers/notes");
//
//
//-------// Initialize App \\
const app = express();
//
//
//-------// Set Template Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//
//
//-------// Add Middleware \\
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//
//
//-------// Test Page \\
app.get("/dev", (req, res, next) => {
  return res.render("home");
});
//

// get login page
app.get("/login", (req, res, next) => {
  return res.render("login");
});

// post login page html
app.post("/login", loginUser);

// get users notes page with users notes loaded
app.get("/notes", oauth, getUserNotes, (req, res, next) => {
  const user = req.user;
  return res.render("/notes", user);
});

// post users create a new note
app.post("/notes", oauth, createNote, (req, res, next) => {
  return res.redirect("/notes");
});
//
//
//
//
//
//-------// Start Our Server
app.listen(process.env.EXTERNAL_PORT || 5050, () => {
  console.log("Server Listening ==> http://localhost:5050");
});
