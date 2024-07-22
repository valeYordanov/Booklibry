import { useState } from "react";
import "./BookList.css";

import BookListItem from "./book-list-item/BookListItem";

import BookService from "../../services/bookService";

import { useEffect } from "react";

export default function BookList() {
  const [books, setBook] = useState([]);

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
      }
    };

    fetchData();
  }, []);
  return (
    <section id="book-list">
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
    </section>
  );
}
