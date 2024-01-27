const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    req.user = jwt.verify(token, process.env.MY_SECRET);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}
