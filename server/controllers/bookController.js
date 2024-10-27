const { PiImagesBold } = require("react-icons/pi");
const { Book } = require("../models/Book");
const User = require("../models/User");
const CustomError = require("../util/customError");

const createBook = async (req, res) => {
  const { author, category, img, pages, summary, title, userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User ID is required to create a book" });
  }

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
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Failed to create book" });
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the books" });
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

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return res.status(500).json({ message: "Failed to fetch book" });
  }
};

const getThreeMostRecentBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ timestamp: -1 }).limit(3);
    res.status(200).json(books);

    if (books.length === 0) {
      return res.status(401).json({ message: "No books found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent books!" });
  }
};

const rentBook = async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    let book;
    try {
      book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).send({ error: "Book not found" });
      }
    } catch (error) {
      console.error("Error finding book:", error);
      return res
        .status(500)
        .send({ error: "Error finding book", details: error.message });
    }

    if (book.isRented) {
      return res.status(400).send({ error: "Book is already rented" });
    }

    try {
      book.isRented = true;
      await book.save();
    } catch (error) {
      console.error("Error saving book:", error);
      return res
        .status(500)
        .send({ error: "Error saving book", details: error.message });
    }

    let user;
    try {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error finding user:", error);
      return res
        .status(500)
        .send({ error: "Error finding user", details: error.message });
    }

    try {
      user.books.push(book._id);
      await user.save();
    } catch (error) {
      console.error("Error saving user:", error);
      return res
        .status(500)
        .send({ error: "Error saving user", details: error.message });
    }

    res.status(200).send({ message: "Book rented successfully", book });
  } catch (error) {
    console.error("General error during book rental:", error);
    res
      .status(500)
      .send({
        error: "An error occurred while renting the book",
        details: error.message,
      });
  }
};

const fetchedRentedBooks = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("books");

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ books: user.books });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching rented books" });
  }
};

const removeRentedBook = async (req, res, next) => {
  const { id } = req.params;
  const { bid } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    console.log(user);

    // If the user is not found, return a 404 error
    if (!user) {
      console.error(`User with ID ${id} not found.`);
      return res.status(404).send({ error: "User not found" });
    }

    if (!user.books.includes(bid)) {
      return res
        .status(404)
        .send({ error: "Book not found in user's rented books" });
    }

    // Remove the book from the user's books array
    user.books.pull(bid);
    console.log(bid);

    // Save the updated user document
    await user.save();

    const book = await Book.findByIdAndUpdate(
      bid,
      { isRented: false }
      // Option to return the updated document
    );

    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    // Return a success message
    res.status(200).send({ message: "Book removed from rented books" });
  } catch (error) {
    console.error("Error removing rented book:", error);

    // Return a 500 status code for any server errors
    res
      .status(500)
      .send({ error: "An error occurred while removing the rented book" });
  }
};

const updateBook = async (req, res, next) => {
  const { author, category, img, pages, summary, title } = req.body;
  const { id } = req.params;

  try {
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.category = category;
    book.img = img;
    book.pages = pages;
    book.summary = summary;

    await book.save();

    res.status(200).send({ book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ message: "Server Error" });
  }
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    await Book.findByIdAndDelete(id);
    res.status(200).send({ message: "Book deleted succesefully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send({ message: "Server Error" });
  }
};

const rateBook = async (req, res) => {
  const { bookId, userId, rating } = req.body;

  
  
  if (rating < 1 || rating > 5) {
    return res.status(400).send({ error: "Rating must be between 1 and 5" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    // Check if the user has already rated this book
    const existingRating = book.ratings.find((r) => r.userId.toString() === userId);

    if (existingRating) {
      existingRating.rating = rating; // Update the existing rating
    } else {
      book.ratings.push({ userId, rating }); // Add a new rating
    }

    // Recalculate the average rating
    const totalRating = book.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    book.averageRating = totalRating / book.ratings.length;

    await book.save();
    res.status(200).send({ message: "Book rated successfully", book });
  } catch (error) {
    console.error("Error rating book:", error);
    res.status(500).send({ error: "An error occurred while rating the book" });
  }
};

const getUserRatingForBook = async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.query;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    const userRating = book.ratings.find(r => r.userId.toString() === userId);
    if (!userRating) {
      return res.status(404).send({ error: "Rating not found" });
    }

    res.status(200).send(userRating);
  } catch (error) {
    console.error("Error fetching user's rating:", error);
    res.status(500).send({ error: "An error occurred while fetching the rating" });
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
  getUserRatingForBook
};
