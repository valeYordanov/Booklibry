import { useContext } from "react";
import { logout } from "../../services/authService";
import "./Header.css";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Header() {
  const navigate = useNavigate();

  const { authState, changeAuthStatetoLogout } = useContext(AuthContext);
  const logouthandler = async () => {
    try {
      await logout();
      changeAuthStatetoLogout();
      navigate("/login");
    } catch (error) {
      error;
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
        </ul>
      </nav>
    </header>
  );
}
