const { Router } = require("express");

const router = Router();


const userController = require("../controllers/userController.js");
const { fetchedRentedBooks, removeRentedBook, rentBook } = require("../controllers/bookController.js");

router.post(
  "/signup",

  userController.signUp
);
router.post('/login', userController.login);
router.get('/:id', userController.fetchUserById);
router.put("/:id", userController.updateUser); 
router.post("/logout", userController.logout);
router.get('/:id/books', fetchedRentedBooks);
router.delete('/:id/books/:bid',removeRentedBook)

module.exports = router;
