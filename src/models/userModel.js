const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

module.exports = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false
});
