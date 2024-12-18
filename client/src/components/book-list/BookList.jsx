import { useState } from "react";
import "./BookList.css";

import BookListItem from "./book-list-item/BookListItem";

import BookService from "../../services/bookService";

import { useEffect } from "react";

import Spinner from "../reusables/spinner/Spinner";

export default function BookList() {
  const [books, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const collectionName = "books";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BookService.getAll();

        setBook(result);
      } catch (error) {
        console.error(error);
      }
    };
    const minDuration = 1000;
    setTimeout(() => setIsLoading(false), minDuration);

    fetchData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collectionName]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredBooks(books);
    } else {
      const queryLowercased = searchQuery.toLowerCase();
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(queryLowercased)
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section id="book-list">
      {isLoading && windowWidth > 800 ? (
        <Spinner className="spinner" />
      ) : (
        <>
          <h1>Browse Books</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a book"
              value={searchQuery}
              onChange={handleChange}
            />
          </div>
          <div id="card-area">
            <div className="wrapper">
              <div className="box-area">
                {filteredBooks.length === 0 && searchQuery ? (
                  <p className="no-book">
                    Sorry,there is no book matching that name!
                  </p>
                ) : (
                  filteredBooks.map((book) => (
                    <BookListItem key={book._id} {...book} />
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
