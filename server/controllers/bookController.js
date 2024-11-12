const { Book } = require("../models/Book");
const User = require("../models/User");
const CustomError = require("../util/customError");

const path = require("path");
const fs = require("fs");
const upload = require("../config/configFile");

const createBook = async (req, res, next) => {
  const { author, category, img, pages, summary, title, userId,file } = req.body;

  // Upload the file to AWS S3

  // Check if the file exists in the request
  if (!file) {
    return res.status(400).json({ message: "File is required" });
  }

  // Get the file URL from the uploaded file in S3
  const fileUrl = file.location;

  // Create a new book object and save it to the database
  try {
    const newBook = new Book({
      author,
      category,
      img,
      isRented: false,
      pages,
      summary,
      timestamp: new Date(),
      title,
      owner: userId,
      file: fileUrl, // Store the URL of the file
    });

    await newBook.save();

    // Return the new book object, including the file URL
    return res.status(201).json({
      ...newBook.toObject(),
      fileUrl, // Full URL for file access
    });
  } catch (error) {
    console.error("Error creating book:", error);
    return next(new CustomError("Failed to create book", 500));
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return next(new CustomError("Failed to fetch the books", 500));
  }
};

const getBookById = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return next(new CustomError("Failed to fetch book", 500));
  }
};

const getThreeMostRecentBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ timestamp: -1 }).limit(3);

    if (books.length === 0) {
      console.log("No books found, sending 404 response.");
      return res.status(404).json({ message: "No books found!" });
    }

    console.log("Books found, sending 200 response.");
    return res.status(200).json(books);
  } catch (error) {
    console.error("Failed to fetch recent books:", error);

    // Only call next if the response hasn't been sent
    if (!res.headersSent) {
      return next(new CustomError("Failed to fetch recent books!", 500));
    } else {
      console.error("Headers already sent, not calling next.");
    }
  }
};

const rentBook = async (req, res, next) => {
  const { bookId, userId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    if (book.isRented) {
      return res.status(400).send({ error: "Book is already rented" });
    }

    book.isRented = true;
    await book.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.books.push(book._id);
    await user.save();

    return res.status(200).send({ message: "Book rented successfully", book });
  } catch (error) {
    console.error("Error during book rental:", error);
    return next(
      new CustomError("An error occurred while renting the book", 500)
    );
  }
};

const fetchedRentedBooks = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("books");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send({ books: user.books });
  } catch (error) {
    console.error("Error fetching rented books:", error);
    return next(
      new CustomError("An error occurred while fetching rented books", 500)
    );
  }
};

const removeRentedBook = async (req, res, next) => {
  const { id, bid } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (!user.books.includes(bid)) {
      return res
        .status(404)
        .send({ error: "Book not found in user's rented books" });
    }

    user.books.pull(bid);
    await user.save();

    const book = await Book.findByIdAndUpdate(bid, { isRented: false });
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    return res.status(200).send({ message: "Book removed from rented books" });
  } catch (error) {
    console.error("Error removing rented book:", error);
    return next(
      new CustomError("An error occurred while removing the rented book", 500)
    );
  }
};

const updateBook = async (req, res, next) => {
  const { author, category, img, pages, summary, title } = req.body;
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    Object.assign(book, { title, author, category, img, pages, summary });
    await book.save();

    return res.status(200).send({ book });
  } catch (error) {
    console.error("Error updating book:", error);
    return next(new CustomError("Server Error", 500));
  }
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    await Book.findByIdAndDelete(id);
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return next(new CustomError("Server Error", 500));
  }
};

const rateBook = async (req, res, next) => {
  const { bookId, userId, rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).send({ error: "Rating must be between 1 and 5" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    const existingRating = book.ratings.find(
      (r) => r.userId.toString() === userId
    );
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      book.ratings.push({ userId, rating });
    }

    const totalRating = book.ratings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    book.averageRating = totalRating / book.ratings.length;

    await book.save();
    return res.status(200).send({ message: "Book rated successfully", book });
  } catch (error) {
    console.error("Error rating book:", error);
    return next(
      new CustomError("An error occurred while rating the book", 500)
    );
  }
};

const getUserRatingForBook = async (req, res, next) => {
  const { bookId } = req.params;
  const { userId } = req.query;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    const userRating = book.ratings.find((r) => r.userId.toString() === userId);
    if (!userRating) {
      return res.status(404).send({ error: "Rating not found" });
    }

    return res.status(200).send(userRating);
  } catch (error) {
    console.error("Error fetching user's rating:", error);
    return next(
      new CustomError("An error occurred while fetching the rating", 500)
    );
  }
};

const getBookContentById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const filePath = path.resolve(book.file);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "inline; filename=file.pdf");
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error sending file");
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  getThreeMostRecentBooks,
  rentBook,
  fetchedRentedBooks,
  removeRentedBook,
  updateBook,
  deleteBook,
  rateBook,
  getUserRatingForBook,
  getBookContentById,
};
