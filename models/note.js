const { DataTypes } = require("sequelize");
const db = require("../database");

const Note = db.define("notes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },

  owner: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = Note;
