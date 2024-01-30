const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/:id", authenticationMiddleware, async (req, res, next) => {
  try {
    // Path to desired directory.
    const picturesDirectory = path.resolve("pictures")
    const pictures = await fs.readdir(picturesDirectory);

    res.sendFile(path.join(picturesDirectory, pictures[req.params.id]));
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/upload", authenticationMiddleware, uploadMiddleware, (req, res, next) => {
  try {
    if (!req.file) {
      return res.sendStatus(422);
    }
    if (req.file.size > 2 * 1024 * 1024) {
      return res.sendStatus(413).json({
        message: "The uploaded file size exceeds 2 MB."
      });
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
