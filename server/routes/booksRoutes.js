const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, getThreeMostRecentBooks, rentBook, updateBook, deleteBook, rateBook, getUserRatingForBook, getBookContentById } = require('../controllers/bookController'); // Adjust path as needed


const { generatePresignedUrl } = require('../config/configFileToUploadToAWS3');







router.post("/presigned-url", generatePresignedUrl);

router.post('/', createBook);

router.post('/rent', rentBook)
router.post('/rate', rateBook);
router.get("/:bookId/rating", getUserRatingForBook);
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)
router.get('/', getAllBooks)
router.get('/recent', getThreeMostRecentBooks)
router.get('/:id', getBookById);
router.get('/file/:bookId',getBookContentById)




module.exports = router;