const express = require("express");
const { configExpress } = require("./config/configExpress");
const { configDatabase } = require("./config/configDatabase");
const cors = require("cors");
const { createBook, rentBook } = require("./controllers/bookController");
const booksRoutes = require("../server/routes/booksRoutes");
const userRoutes = require("../server/routes/userRoutes");
const errorHandler = require("./util/error-handler");

const PORT = 5000;
startApp();
async function startApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/books", booksRoutes);
  app.use('/api/rentedBooks' , rentBook)
  app.use("/api/users", userRoutes);
  app.use(errorHandler);
  configExpress(app);
  configDatabase();

  app.listen(PORT, () =>
    console.log("Server is started on http://localhost:5000")
  );
}
