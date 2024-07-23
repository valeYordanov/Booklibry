import { useEffect, useState } from "react";

import "./BookDetails.css";
import BookService from "../../services/bookService";
import { useParams } from "react-router-dom";

import StarRating from "../reusables/star-rating/StarRating";



export default function BookDetails() {
  const [book, setBook] = useState({});
  

  const { bookId } = useParams();

  useEffect(() => {
    (async () => {
      const result = await BookService.getOne(bookId);

      setBook(result);
    })();

    
  });
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

          <StarRating totalStars={5} bookId={bookId}/>
        </div>
      </div>

      <div className="special-buttons">
        <button className="rent-btn">Rent</button>

        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </section>
  );
}
