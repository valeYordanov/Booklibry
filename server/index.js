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

  
  const allowedOrigins = [
    'https://booklibry-client.onrender.com',
    // Add any other frontend origins you want to allow
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        // Allow all requests from allowedOrigins, or allow requests without origin (e.g., for curl)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  // Enable CORS with the specified options
  app.use(cors(corsOptions));
  app.use(express.json({limit:Infinity}));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use("/api/books", booksRoutes);
  
  app.use("/api/users", userRoutes);
  app.use(errorHandler);
  configExpress(app);
  configDatabase();

  app.listen(PORT, () =>
    console.log("Server is started on https://booklibry-server.onrender.com")
  );

  
}
