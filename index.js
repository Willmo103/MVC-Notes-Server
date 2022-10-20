//-------// Imports \\
const { json } = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const Note = require("./models/note");
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
//-------// Get Homepage \\
app.get("/notesHome", (req, res, next) => {
  return res.render("home");
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
