const errorHandlerMiddleware = (err, req, res) => {
  console.error(err.stack);
  res.sendStatus(err.statusCode || 500).json({ message: err.message || "Something went wrong." });
}

module.exports = errorHandlerMiddleware;
