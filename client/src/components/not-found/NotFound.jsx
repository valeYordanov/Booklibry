import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="error-container">
      <h1 className="error-title"> 404 </h1>
      <p className="error-text">
        Oops! The page you're looking for is not here.
      </p>
      <Link className="error-home" to="/">
        Go Back to Home
      </Link>
    </div>
  );
}
