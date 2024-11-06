/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function RentedBookListItem({
  // eslint-disable-next-line react/prop-types
  _id,
  title,
  author,
  img,
  owner,
  returnBookHandler,
}) {
  return (
    <li>
      <div className="rented-book">
        <img src={img} alt="Book 1" className="book-cover" />
        <div className="book-details">
          <h3>{title}</h3>
          <p>
            <strong>Author:</strong> {author}
          </p>

          <button onClick={() => returnBookHandler(_id)} className="return-btn">
            Return
          </button>
          <Link className="read-btn" to={`/user-profile/${owner}/${_id}`}>Read</Link>
        </div>
      </div>
    </li>
  );
}
