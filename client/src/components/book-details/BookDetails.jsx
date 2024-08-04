import { useContext, useEffect, useRef, useState } from "react";

import "./BookDetails.css";
import BookService from "../../services/bookService";
import { Link, useNavigate, useParams } from "react-router-dom";

import StarRating from "../reusables/star-rating/StarRating";

import AuthContext from "../../contexts/authContext";
import { deleteRatingByBookTitle } from "../../services/ratingService";
import Spinner from "../reusables/spinner/Spinner";

export default function BookDetails() {
  const [book, setBook] = useState({});

  const { bookId } = useParams();
  const navigate = useNavigate();

  const [isUnavailable, setIsUnavailabe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
  
    if (isConfirmed) {
      try {
        
        const result = await BookService.delete("/books", bookId);
  
        if (result) {
          await deleteRatingByBookTitle(book.title);
          navigate("/books");
        }
      } catch (error) {
        console.error("Error deleting the book:", error);
      }
    } 
  };

  const submitGoBackHandler = () => {
    navigate("/books");
  };

  const rentHandler = async () => {

    setIsLoading(true)
    try {
      const res = await BookService.updateBook("books", bookId, {
        isRented: true,
      });
      setBook(res);

      setIsUnavailabe(true);

      await BookService.rentBook(authState.uid,book,bookId)


    } catch (error) {
      console.log(error);
    }

    const minDuration = 700;
    setTimeout(() => setIsLoading(false), minDuration);
    
  };

  return (
    
    <section className="book">
      {isLoading ? (<Spinner/>) : (<><div className="book-container">

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
      </div><div className="special-buttons">

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
        </div></>)}
      
    </section>
  );
}
