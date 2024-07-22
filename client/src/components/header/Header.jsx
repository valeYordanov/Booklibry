import "./Header.css"

import { Link } from "react-router-dom";

export default function Header() {

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
          <li>
            <Link to="/add-book">Add Your Book</Link>
          </li>
          <li>
            <Link to="#">Login</Link>
          </li>
          <li>
            <Link to="#">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
