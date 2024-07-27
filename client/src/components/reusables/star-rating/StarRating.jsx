/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";

import "./StarRating.css";

import {
  fetchRatingForBookByUser,
  submitRating,
} from "../../../services/ratingService";
import AuthContext from "../../../contexts/authContext";

const StarRating = ({ totalStars = 5, bookTitle }) => {
  const [rating, setRatingState] = useState(null); // Current rating from the database
  const [hoverRating, setHoverRating] = useState(null); // Rating being hovered over
  const [isRatingFrozen, setIsRatingFrozen] = useState(false); // Whether the rating is frozen

  const { authState } = useContext(AuthContext);
  const userId = authState.uid;

  // Function to handle rating submission
  const handleRating = async (ratingValue) => {
    try {
      await submitRating(bookTitle, userId, ratingValue, Date.now());
      setRatingState(ratingValue); // Update the local state with the new rating
      setIsRatingFrozen(true); // Freeze the stars after rating
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const result = await fetchRatingForBookByUser(bookTitle, userId);
        if (result) {
          setRatingState(result.rating); // Extract rating value from result
          setIsRatingFrozen(true); // Set isRatingFrozen based on fetched rating
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchRating();
  }, [bookTitle, userId]);

  // Function to render stars based on the current rating and hover rating
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
            transition: "color 0.2s", // Smooth transition for color change
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
