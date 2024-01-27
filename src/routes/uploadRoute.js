const express = require("express");
const multer = require("multer");
const path = require("path");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("pictures"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.${file.originalname.split(".")[1]}`);
  },
});
const upload = multer({ storage });

router.post("/", authenticateMiddleware, upload.single("upload_file"), (req, res) => {
  console.log(req.file);

  if (req.file.size > 2 * 1024^2) return res.sendStatus(413);

  res.sendStatus(200);
});

module.exports = router;