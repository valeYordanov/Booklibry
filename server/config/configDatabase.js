const mongoose = require("mongoose");

async function configDatabase() {
  const connectionString = "mongodb+srv://valio052:valio9409081088@cluster0.ht6n65a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  await mongoose.connect(connectionString);

  console.log("Database connected!");
}

module.exports={configDatabase}