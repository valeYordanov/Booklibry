import { useEffect, useState } from "react";
import "./UserProfile.css";
import { getUser } from "../../../services/userService";
import { Link, useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userResult = await getUser(userId);

      setUser(userResult);

      console.log(userResult);
    };

    fetchUserData();
  }, [userId]);

  return (
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
        <p>
          <strong>Member Since:</strong> January 2020
        </p>
      </div>
      <div className="books-rented">
        <h2>Books Rented</h2>
        <ul>
          <li>
            <div className="book">
              <img src="book1.jpg" alt="Book 1" className="book-cover" />
              <div className="book-details">
                <h3>Book Title 1</h3>
                <p>
                  <strong>Author:</strong> Author Name
                </p>
                <p>
                  <strong>Rented On:</strong> July 1, 2024
                </p>
              </div>
            </div>
          </li>
        </ul>
        <Link to={`/user-profile/${userId}/edit`} className="edit-profile">
            Edit Profile
          </Link>
      </div>
    </div>
  );
}
