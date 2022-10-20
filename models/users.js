const { DataTypes } = require("sequelize");
const db = require("../database");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
