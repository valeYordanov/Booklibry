const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, getThreeMostRecentBooks, rentBook, fetchedRentedBooks, updateBook, deleteBook, rateBook, getUserRatingForBook } = require('../controllers/bookController'); // Adjust path as needed
const { validateBook } = require('../middlewares/expressValidatorUtil');
const cors = require("cors");

// POST route to create a book
router.post('/', validateBook, createBook);
router.post('/rent' ,rentBook)
router.post('/rate', rateBook);
router.get("/:bookId/rating", getUserRatingForBook);
router.patch('/:id' , updateBook)
router.delete('/:id', deleteBook )
router.get('/' , getAllBooks)
router.get('/recent' , getThreeMostRecentBooks)
router.get('/:id', getBookById);




module.exports = router;