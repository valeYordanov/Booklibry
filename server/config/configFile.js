const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config()

// Configure AWS SDK
AWS.config.update({
  region: "eu-north-1", // Set your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
});

const s3 = new AWS.S3();

// Set up multer to use memory storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "booklibry", // Replace with your bucket name
    acl: "public-read", // Set permission (public-read or private)
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}_${file.originalname}`); // Create unique file name
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // File size limit (e.g., 100MB)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
