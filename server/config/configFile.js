import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv, { config } from 'dotenv';

dotenv.config();

// Configure AWS SDK
const s3Client = new S3Client({
  region: "eu-north-1", // Set your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Set up multer to use memory storage
const upload = multer({
  storage: multerS3({
    s3: s3Client, // Use the new S3 client from AWS SDK v3
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

export default upload;
