const mongoose = require("mongoose");

async function configDatabase() {
  const connectionString = "mongodb://0.0.0.0:27017/Booklibry";

  await mongoose.connect(connectionString);

  console.log("Database connected!");
}

module.exports={configDatabase}