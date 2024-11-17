const { body, validationResult } = require("express-validator");

const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("pages")
    .isInt({ min: 1 })
    .withMessage("Pages must be a positive integer"),
  body("summary")
    .isLength({ max: 2000 })
    .withMessage("Summary must be 2000 characters or less"),
  

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateBook };
