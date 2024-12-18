import { useEffect, useState } from "react";
import "./MostRecentBooks.css";
import BookService from "../../services/bookService";
import MostRecentBookItem from "./most-recent-book-item/MostRecentBookItem";

export default function MostRecentBooks() {
  const [recentBooks, setRecentBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BookService.fetchRecentBooks();

        setRecentBooks(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recent-container">
      <h1 className="recent-title">Most Recent Books</h1>
      <div className="recent-list">
        {recentBooks.map((book) => (
          <MostRecentBookItem key={book._id} {...book} />
        ))}
      </div>
    </div>
  );
}
