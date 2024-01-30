const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

// Desired output folder for pictures.
const pictureDirectory = path.resolve("pictures");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, path.resolve("pictures"));
  },
  filename: async (req, file, cb) => {
    const pictures = await fs.readdir(pictureDirectory);
    cb(null, `${pictures.length}.${file.originalname.split(".")[1]}`)
  }
});
const upload = multer({ storage });

module.exports = upload.single("uploaded_file");
