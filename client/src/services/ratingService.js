import { get, ref, set } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export const submitRating = async (bookTitle, userId, rating) => {
  try {
    // Create a reference to the specific rating entry in the database
    const ratingRef = ref(db, `ratings/${bookTitle}/${userId}`);

    // Prepare the rating data
    const ratingData = {
      rating,
    };

    // Write the data to the database
    await set(ratingRef, ratingData);

    console.log("Rating submitted successfully!");
  } catch (error) {
    // Handle errors and throw a new error message
    throw new Error("Error submitting rating: " + error.message);
  }
};
export const fetchRatingForBookByUser = async (bookTitle, userId) => {
  try {
    // Create a reference to the specific rating entry in the database
    const ratingRef = ref(db, `ratings/${bookTitle}/${userId}`);

    // Fetch the data from the database
    const snapshot = await get(ratingRef);

    // Check if data exists and return it
    if (snapshot.exists()) {
      return snapshot.val(); // Returns the rating data
    } else {
      return null; // No rating found for this book and user
    }
  } catch (error) {
    // Handle errors and throw a new error message
    throw new Error("Error fetching rating: " + error.message);
  }
};
