import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookService from "../../services/bookService";

import "./BookEdit.css";

export default function BookEdit() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    img: "",
    pages: "",
    summary: "",
  });

  const { bookId } = useParams();

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await BookService.getOne(bookId);

        setBook(result);
      } catch (error) {
        console.log("Error getting the book" + bookId);
      }
    })();
  }, [bookId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBook((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!book.title) newErrors.title = "Title is required!";
    if (!book.author) newErrors.author = "Author is required!";
    if (!book.category) newErrors.category = "Category is required!";
    if (!book.img) newErrors.img = "Image URL is required!";
    if (!book.pages || isNaN(book.pages))
      newErrors.pages = "Valid number of pages is required!";

    if (!book.summary) newErrors.summary = "Summary is required!";

    return newErrors;
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();

    try {
      const newErrors = validate();
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        await BookService.updateBook(bookId, book);

        navigate(`/books/${bookId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelClickHandler = () => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="full-form">
      <div className="form">
        <h1>Edit the book</h1>

        <form onSubmit={submitEditHandler} className="edit-form">
          <label htmlFor="title">Title</label>
          {errors.title && <span>{errors.title}</span>}
          <input
            type="text"
            placeholder="Edit title"
            name="title"
            value={book.title}
            onChange={handleOnChange}
          />

          <label htmlFor="category">Category</label>
          {errors.category && <span>{errors.category}</span>}
          <textarea
            name="category"
            id="desc"
            cols="60"
            rows="3"
            placeholder="Add category here..."
            value={book.category}
            onChange={handleOnChange}
          ></textarea>

          <label htmlFor="author">Author</label>
          {errors.author && <span>{errors.author}</span>}
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={book.author}
            onChange={handleOnChange}
          />

          <label htmlFor="Summary">Summary</label>
          {errors.summary && <span>{errors.summary}</span>}
          <textarea
            name="summary"
            id="summary"
            cols="60"
            rows="3"
            placeholder="Add summary here..."
            value={book.summary}
            onChange={handleOnChange}
          ></textarea>

          <label htmlFor="pages">Pages count</label>
          {errors.pages && <span>{errors.pages}</span>}
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleOnChange}
          />

          <label htmlFor="image">Add picture</label>
          {errors.img && <span>{errors.img}</span>}
          <input
            type="text"
            placeholder="Add image URL"
            name="img"
            value={book.img}
            onChange={handleOnChange}
          />

          <div className="buttons">
            <button className="add">Edit</button>

            <button onClick={cancelClickHandler} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
