import { useEffect, useState } from "react";

import "./BookDetails.css";
import BookService from "../../services/bookService";
import { useNavigate, useParams } from "react-router-dom";

import StarRating from "../reusables/star-rating/StarRating";

export default function BookDetails() {
  const [book, setBook] = useState({});

  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await BookService.getOne(bookId);

      setBook(result);
    })();
  });

  const submitDeleteHandler = async () => {
    await BookService.delete("/books", bookId);
    navigate("/books");
  };

  const submitGoBackHandler = () => {
    navigate("/books");
  };

  return (
    <section className="book">
      <div className="book-container">
        <div className="book-img">
          <img src={book.img} alt="" />
        </div>

        <div className="book-details">
          <h1 className="title">{book.title}</h1>
          <label htmlFor="author">Author</label>
          <h3 className="author">{book.author}</h3>

          <h2 className="resume">Resume</h2>
          <p>{book.summary}</p>

          <StarRating totalStars={5} bookId={bookId} />
        </div>
      </div>

      <div className="special-buttons">
        <button className="rent-btn">Rent</button>

        <button className="edit-btn">Edit</button>
        <button onClick={submitDeleteHandler} className="delete-btn">
          Delete
        </button>
        <button onClick={submitGoBackHandler} className="go-back-btn">
          Go Back
        </button>
      </div>
    </section>
  );
}
