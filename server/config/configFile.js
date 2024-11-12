const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');

dotenv.config();

// Configure AWS SDK
const s3 = new AWS.S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});




// Set up multer to use S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "booklibry",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;

