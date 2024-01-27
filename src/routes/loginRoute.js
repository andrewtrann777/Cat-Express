const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  const user = await userModel.findOne({
    where: {
      username,
      password,
    },
  });

  if (!user) return res.sendStatus(403);

  const token = jwt.sign({
    username,
  }, process.env.MY_SECRET, {
    expiresIn: "10m",
  });

  res.cookie("token", token);

  res.sendStatus(200);
});

module.exports = router;