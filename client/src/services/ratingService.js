import axios from "axios";

export const submitRating = async (bookId, userId, rating) => {
  try {
    const response = await axios.post("https://booklibry-server.onrender.com/api/books/rate", {
      bookId,
      userId,
      rating,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error rating book: " + error.message);
  }
};
export const fetchRatingForBookByUser = async (bookId, userId) => {
  try {
    const response = await axios.get(
      `https://booklibry-server.onrender.com/api/books/${bookId}/rating`,
      {
        params: { userId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rating:", error);
    throw error;
  }
};
