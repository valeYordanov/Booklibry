import { Link } from "react-router-dom";


/* eslint-disable react/prop-types */
export default function BookListItem({

  
    // eslint-disable-next-line react/prop-types
    _id,
    title,
    author,
    img,
    isRented,
}) {
  
  return (
    <div className={`box-container ${isRented ? 'rented' : ''}`}>
      <img
        src={img}
        alt=""
      />
      <div className="overlay">
        <h3>{title}</h3>

        {!isRented ? (<p className="can-rent">Available</p>) : <p className="can-rent">Rented!</p>}
        <p>{author}</p>
        <Link to={`/books/${_id}`}>Get Now</Link>
      </div>
    </div>
  );
}
