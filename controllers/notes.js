const Note = require("../models/note");
const { serverError } = require("../status");

exports.getUsersNotes = async (req, res, next) => {
  try {
    const notes = await Note.findByPk(req.user.name);
    req.user.notes = notes;
    next();
  } catch (error) {
    res.status(500);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const USER_NOTE_MODEL = {
      owner: req.user.name,
      title: req.body.title,
      content: req.body.content,
    };
    const user = await Note.create(USER_NOTE_MODEL);
    next();
  } catch (error) {
    res.status(500);
  }
};
