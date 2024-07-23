import { Link, useParams } from "react-router-dom";
import StarRating from "../../reusables/star-rating/StarRating";

/* eslint-disable react/prop-types */
export default function BookListItem({

  
    // eslint-disable-next-line react/prop-types
    id,
    title,
    author,
    img,
}) {
  
  return (
    <div className="box-container">
      <img
        src={img}
        alt=""
      />
      <div className="overlay">
        <h3>{title}</h3>

        
        <p>{author}</p>
        <Link to={`/books/${id}`}>Get Now</Link>
      </div>
    </div>
  );
}
