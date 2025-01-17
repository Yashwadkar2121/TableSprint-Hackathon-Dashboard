const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, `${uuidv4()}${ext}`); // Generate a unique name for the file
  },
});

// File filter to only allow image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
