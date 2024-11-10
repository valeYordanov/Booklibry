const {Storage} = require('@google-cloud/storage')
import multer from 'multer';

// Create a new Google Cloud Storage instance
const storage = new Storage();

// Reference your bucket
const bucket = storage.bucket("booklibry"); // Replace with your bucket name

// Set up Multer to handle file uploads to Google Cloud
const multerGoogleStorage = multer({
  storage: multer.memoryStorage(), // Use memory storage to handle file as buffer
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit (adjust as needed)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  },
});

export const uploadFileToGoogleCloud = async (fileBuffer, fileName) => {
  // Upload the file buffer to Google Cloud Storage
  const file = bucket.file(fileName);
  await file.save(fileBuffer, {
    metadata: {
      contentType: "application/pdf", // Set the correct MIME type
    },
    public: true, // You can make the file publicly accessible
  });

  // Return the public URL of the file
  return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
};
