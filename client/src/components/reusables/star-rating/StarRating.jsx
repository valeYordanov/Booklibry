/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import "./StarRating.css";

import { get, ref, update } from "firebase/database";
import database from "../../../firebase/firebaseConfig.js";
import { useParams } from "react-router-dom";

const StarRating = ({ totalStars = 5}) => {
  const [rating,setRatingState] = useState(0)
const [isRatingFrozen,setIsRatingFrozen] = useState(false)
  
     const {bookId} = useParams()
    
    
    const handleRating = async(ratingValue) => {

      if(isRatingFrozen) return;
      setRatingState(ratingValue);
      try {
        const bookRef = ref(database, `books/${bookId}`)
        await update(bookRef, {
          rating: ratingValue,
        });
        console.log("Rating saved successfully");
        setIsRatingFrozen(true)
      } catch (e) {
        console.error("Error adding rating: ", e);
      }
    }
      
    useEffect(() => {
      const fetchRating = async () => {
        const itemRef = ref(database, `books/${bookId}/rating`);
        try {
          const snapshot = await get(itemRef);
          if (snapshot.exists()) {
            const ratingValue = snapshot.val();
            console.log('Fetched rating:', ratingValue); // Log fetched rating
            setRatingState(ratingValue);
            setIsRatingFrozen(true); // Optionally freeze rating if already set
          } else {
            console.log('No rating found for item:', bookId); // Log if no rating found
          }
        } catch (error) {
          console.error('Error fetching rating: ', error);
        }
      };
      fetchRating(bookId)
    },[bookId])
    

  
  return (
    <div>
      
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          
          <label key={index}>
            
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              style={{ display: "none" }}
              disabled={isRatingFrozen}
              
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              xmlns="http://www.w3.org/2000/svg"
              
              onMouseEnter={() => !isRatingFrozen && setRatingState(ratingValue) }
              onMouseLeave={() => !isRatingFrozen && setRatingState(0)}
              
              style={{ cursor: isRatingFrozen ? 'default' : 'pointer' }}
            >
            
              <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847 1.42 8.284L12 18.897l-7.42 4.82L6 15.434l-6-5.847 8.332-1.569L12 .587z" />
            </svg>
            
            
          </label>
        );
      })}
      <div>
      <p>Rating: {rating}/{totalStars}</p>
      
      </div>
    </div>
  );

}
export default StarRating;