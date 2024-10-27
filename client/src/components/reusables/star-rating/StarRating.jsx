/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";

import "./StarRating.css";

import {
  fetchRatingForBookByUser,
 
  submitRating
} from "../../../services/ratingService";
import AuthContext from "../../../contexts/authContext";


const StarRating = ({ totalStars = 5, bookId}) => {
  const [rating, setRatingState] = useState(null); 
  const [hoverRating, setHoverRating] = useState(null); 
  const [isRatingFrozen, setIsRatingFrozen] = useState(false); 

  const { authState } = useContext(AuthContext);
  const userId = authState.uid;

  
  const handleRating = async (ratingValue) => {
    try {
      await submitRating(bookId, userId, ratingValue, );
      setRatingState(ratingValue); 
      setIsRatingFrozen(false);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const result = await fetchRatingForBookByUser(bookId, userId);
        if (result && result.rating) {
          setRatingState(result.rating); // Set the rating state if it exists
        } else {
          setRatingState(null); // Reset or clear the rating state if no rating exists
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
        setRatingState(null); // Ensure rating state is cleared on error as well
      }
    };
  
    fetchRating();
  }, [bookId, userId]);
  
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: isRatingFrozen ? "pointer" : "pointer",
            color: i <= (hoverRating || rating) ? "gold" : "gray",
            fontSize: "24px",
            transition: "color 0.2s", 
          }}
          onMouseEnter={() => !isRatingFrozen && setHoverRating(i)}
          onMouseLeave={() => !isRatingFrozen && setHoverRating(null)}
          onClick={() => {
            if (!isRatingFrozen || i !== rating) {
              handleRating(i);
            }
          }}
        >
          &#9733; {/* Star character */}
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <h2>Rate this Book</h2>
      <div>{renderStars()}</div>
      <p>
        Your Rating: {rating !== null ? `${rating} stars` : "Not rated yet"}
      </p>
    </div>
  );
};

export default StarRating;
