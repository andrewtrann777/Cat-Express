const express = require("express");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const userModel = require("../models/userModel");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const {username, password} = req.body;

    const user = await userModel.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.sendStatus(200).json({
        message: "This username already exists!"
      });
    }

    await userModel.create({
      username,
      password
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({
      where: {
        username
      }
    });

    if (!user || !user.password === password) {
      return res.sendStatus(401).json({
        message: "You have entered an invalid username/password."
      });
    }

    const token = jwt.sign({
      username
    }, process.env.TOKEN_SECRET, {
      expiresIn: "10m"
    });

    res.cookie("token", token);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", authenticationMiddleware, (req, res, next) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
