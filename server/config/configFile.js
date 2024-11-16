const AWS = require("aws-sdk");

const dotenv = require("dotenv");

dotenv.config();

// Configure AWS SDK
const s3 = new AWS.S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const generatePresignedUrl = async (req, res, next) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ message: "File name and type are required" });
  }

  const params = {
    Bucket: "booklibry",
    Key: `uploads/${Date.now()}_${fileName}`,
    ContentType: fileType,
    Expires: 60, // URL expiration time in seconds
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    return res.status(200).json({
      uploadUrl,
      filePath: params.Key, // Path to save in the database
    });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return next(new Error("Failed to generate pre-signed URL"));
  }
};

module.exports = { generatePresignedUrl };
