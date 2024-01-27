const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const sequelize = require("./sequelize");
const loginRoute = require("./routes/loginRoute");
const uploadRoute = require("./routes/uploadRoute");

const app = express();
const port = process.env.PORT ?? 8080;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Established database connection.");
  } catch (error) {
    throw error;
  }
})();

const pictureDirectory = path.resolve("pictures");

if (!fs.existsSync(pictureDirectory)) {
  fs.mkdirSync(pictureDirectory);
}

app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({
    extended: true,
  }),
);
app.use("/login", loginRoute);
app.use("/upload", uploadRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
