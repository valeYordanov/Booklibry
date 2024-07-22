/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState } from "react";

import "./StarRating.css";
import FirebaseService from "../../../services/ratingService";
export default function StarRating() {
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState(0);

  const handleRatingChange = (e) => {
    setNewRating(e.target.value);
  };

  const handleAddRating = async (bookId) => {
    try {
      const ratingData = { rating: newRating };
      const addedRating = await FirebaseService.addRating(bookId, ratingData);
      setRatings([...ratings, addedRating]);
      setNewRating(0);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="rating">
      <h2 className="first" >Rate this book</h2>
      <select  value={newRating} onChange={handleRatingChange}>
        <option  value={0} disabled>
         What rating are you giving?
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button className="submit-rating" onClick={handleAddRating}>Rate</button>
      <h3>Ratings</h3>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>{rating.rating}</li>
        ))}
      </ul>
    </div>
  );
}
