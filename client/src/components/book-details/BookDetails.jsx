import { useContext, useEffect, useRef, useState } from "react";

import "./BookDetails.css";
import BookService from "../../services/bookService";
import { Link, useNavigate, useParams } from "react-router-dom";

import StarRating from "../reusables/star-rating/StarRating";

import AuthContext from "../../contexts/authContext";
import { deleteRatingByBookTitle } from "../../services/ratingService";

export default function BookDetails() {
  const [book, setBook] = useState({});

  const { bookId } = useParams();
  const navigate = useNavigate();

  const [isUnavailable, setIsUnavailabe] = useState(false);

  const { authState } = useContext(AuthContext);
  const isAuthenticated = authState.isAuthenticated;

  let isOwner = useRef(false);

  useEffect(() => {
    (async () => {
      const result = await BookService.getOne(bookId);

      setBook(result);
      setIsUnavailabe(book.isRented || false);

      if (authState.uid === result.userId) {
        isOwner.current = true;
      } else {
        isOwner.current = false;
      }
    })();
  });

  const submitDeleteHandler = async () => {
    await BookService.delete("/books", bookId);

    await deleteRatingByBookTitle(book.title);

    navigate("/books");
  };

  const submitGoBackHandler = () => {
    navigate("/books");
  };

  const rentHandler = async () => {
    try {
      const res = await BookService.update("books", bookId, {
        isRented: true,
      });
      setBook(res);

      setIsUnavailabe(true);
    } catch (error) {
      console.log(error);
    }
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

          {isAuthenticated && !isOwner.current ? (
            <StarRating totalStars={5} bookId={bookId} bookTitle={book.title} />
          ) : null}
          {!isAuthenticated && (
            <p>You need to be logged in to see and rate this book.</p>
          )}
        </div>
      </div>

      <div className="special-buttons">
        {!isUnavailable && (
          <button onClick={rentHandler} className="rent-btn">
            Rent
          </button>
        )}

        {isOwner.current && (
          <Link to={`/books/${bookId}/edit`} className="edit-btn">
            Edit
          </Link>
        )}
        {isOwner.current && (
          <button onClick={submitDeleteHandler} className="delete-btn">
            Delete
          </button>
        )}

        <button onClick={submitGoBackHandler} className="go-back-btn">
          Go Back
        </button>
      </div>
    </section>
  );
}
