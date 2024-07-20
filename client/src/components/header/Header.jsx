import "./Header.css"

export default function Header() {

  return (
    <header className="site-header">
      <div className="site-title">
        <h1>
          <a className="home" href="#">
            Booklibry
          </a>
        </h1>
      </div>

      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Books</a>
          </li>
          <li>
            <a href="#">Add Your Book</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
