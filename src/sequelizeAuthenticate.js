const sequelize = require("./sequelize");

const userModel = require("./models/userModel");

const sequelizeAuthenticate = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await userModel.findOrCreate({
      where: {
        username: "test",
        password: "test"
      }
    });
    console.log("Established database connection.");
  } catch (error) {
    throw error;
  }
}

module.exports = sequelizeAuthenticate;
