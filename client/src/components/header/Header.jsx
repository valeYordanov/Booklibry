import { useContext } from "react";
import { logout } from "../../services/authService";
import "./Header.css";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { FaUser } from "react-icons/fa";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();

  const { authState, changeAuthStatetoLogout } = useContext(AuthContext);

  const userId = authState.uid;
  const logouthandler = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authState.token}`, // Send the current token if you want to validate
          },
        }
      );
      // Proceed with clearing local storage and redirecting as before
      localStorage.removeItem("authToken");
      changeAuthStatetoLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any errors if needed
    }
  };
  return (
    <header className="site-header">
      <div className="site-title">
        <h1>
          <Link className="home" to="/">
            Booklibry
          </Link>
        </h1>
      </div>

      <div className="user-profile">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            {authState.isAuthenticated && (
              <li>
                <Link to="/add-book">Add Your Book</Link>
              </li>
            )}
            {!authState.isAuthenticated && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            {authState.isAuthenticated && (
              <li>
                <Link onClickCapture={logouthandler}>Logout</Link>
              </li>
            )}

            {authState.isAuthenticated && (
              <>
                <li>
                  <Link to={`/user-profile/${userId}`}>
                    <FaUser />
                  </Link>
                </li>
                <p className="welcoming-msg">
                  Welcome back,{" "}
                  <span className="email-span">{authState.email}</span>
                </p>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
