import { useState } from "react";
import "./BookList.css";

import BookListItem from "./book-list-item/BookListItem";

import BookService from "../../services/bookService";

import { useEffect } from "react";
import Spinner from "../reusables/spinner/Spinner";

export default function BookList() {
  const [books, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const collectionName = "books";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BookService.getAll(collectionName);

        setBook(
          result
            ? Object.entries(result).map(([id, value]) => ({ id, ...value }))
            : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(true);
      }
    };

    const minDuration = 1000;
    setTimeout(() => setIsLoading(false), minDuration);

    fetchData();
  }, []);
  return (
    <section id="book-list">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1>Browse Books</h1>
          <div id="card-area">
            <div className="wrapper">
              <div className="box-area">
                {books.map((book) => (
                  <BookListItem key={book.id} {...book} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
