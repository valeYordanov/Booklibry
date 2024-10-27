import { useEffect, useState } from "react";
import "./UserProfile.css";
import { getUser } from "../../../services/userService";
import { Link, useParams } from "react-router-dom";
import BookService from "../../../services/bookService";
import RentedBookListItem from "./user-rented-books/UserRentedBookItem";
import Spinner from "../../reusables/spinner/Spinner";

export default function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState({});

  const [rentedBooks, setRentedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResult = await getUser(userId);

        const userBooks = await BookService.getRentedBooks(userId);

        setRentedBooks(userBooks.books);

        setUser(userResult);
      } catch (error) {
        console.log(error);
      }
    };

    const minDuration = 900;
    setTimeout(() => setIsLoading(false), minDuration);

    fetchUserData();
  }, [userId]);

  const returnBookHandler = async (bookId) => {
    await BookService.returnRentedBook(userId, bookId);

    setRentedBooks((rentedBooks) =>
      rentedBooks.filter(({ _id }) => _id !== bookId)
    );
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <img
              src="https://freesvg.org/img/abstract-user-flat-4.png"
              alt="User Avatar"
              className="avatar"
            />
            <h1 className="username-h1">{user.username}</h1>
          </div>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>Telephone:</strong> {user.tel}
            </p>
          </div>
          <div className="books-rented">
            <h2>Books Rented</h2>
            <p className="books-count">
              You have burrowed {rentedBooks.length}{" "}
              {rentedBooks.length > 1 || rentedBooks.length === 0
                ? "books"
                : "book"}
              .
            </p>
            <ul className="rented-books-list">
              {rentedBooks.map((book) => (
                <RentedBookListItem
                  key={book._id}
                  {...book}
                  returnBookHandler={returnBookHandler}
                />
              ))}
            </ul>
          </div>
          <Link to={`/user-profile/${userId}/edit`} className="edit-profile">
            Edit Profile
          </Link>
        </div>
      )}
    </div>
  );
}
