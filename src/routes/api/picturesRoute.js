const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const authenticationMiddleware = require("../../middleware/authenticationMiddleware");
const uploadMiddleware = require("../../middleware/uploadMiddleware");

const router = express.Router();

router.get("/:id", authenticationMiddleware, async (req, res) => {
  try {
    const pictures = await fs.readdir(path.resolve("pictures"));

    for (const picture of pictures) {
      if (picture.split(".")[0] === `IMG_${req.params.id}`) {
        return res.sendFile(path.resolve("pictures", picture))
      }
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/upload", authenticationMiddleware, uploadMiddleware, (req, res) => {
  try {
    if (req.file.size > 2 * 1024 * 1024) {
      return res.sendStatus(413).json({
        message: "The uploaded file size exceeds 2 MB."
      });
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
