import { get, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export const submitRating = async (bookTitle, userId, rating) => {
  try {
    const ratingRef = ref(db, `ratings/${bookTitle}/${userId}`);

    const ratingData = {
      rating,
    };

    await update(ratingRef, ratingData);

    console.log("Rating submitted successfully!");
  } catch (error) {
    throw new Error("Error submitting rating: " + error.message);
  }
};
export const fetchRatingForBookByUser = async (bookTitle, userId) => {
  try {
    const ratingRef = ref(db, `ratings/${bookTitle}/${userId}`);

    const snapshot = await get(ratingRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error fetching rating: " + error.message);
  }
};

export const deleteRatingByBookTitle = async (bookTitle) => {
  try {
    const dbRef = ref(db, `ratings/${bookTitle}`);
    await remove(dbRef);
    console.log("Ratings for book deleted successfully.");
    return bookTitle;
  } catch (error) {
    console.error("Error deleting ratings:", error);
  }
};
