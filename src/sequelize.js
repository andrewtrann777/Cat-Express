const { Sequelize } = require("sequelize");
const path = require("path");

module.exports = new Sequelize({
  dialect: "sqlite",
  // Your path to SQLite database.
  storage: path.join(__dirname, "..", "CatExpress.sqlite")
});
