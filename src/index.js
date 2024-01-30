const express = require("express");
const cookieParser = require("cookie-parser");

const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const authRoute = require("./routes/authRoute");
const uploadRoute = require("./routes/picturesRoute");
const authenticate = require("./authenticate");


const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoute);
app.use("/pictures", uploadRoute);

// Error handler
app.use(errorHandlerMiddleware);

authenticate();

const port = process.env.EXPRESS_PORT ?? 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
