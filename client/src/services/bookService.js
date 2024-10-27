import axios from "axios";

const BookService = {
  getAll: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books`);

      return response.data;
    } catch (error) {
      throw new Error("Error getting data: " + error.message);
    }
  },

  getOne: async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching book: " + error.message);
    }
  },

  fetchRecentBooks: async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/recent`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error getting data: " + error.message);
    }
  },

  rentBook: async (bookId, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/books/rent`,
        {
          bookId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error getting data: " + error.message);
    }
  },

  getRentedBooks: async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/books`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  create: async (newData, userId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/books`, {
        ...newData,
        userId,
      });

      return response.data;
    } catch (error) {
      throw new Error("Error adding data: " + error.message);
    }
  },

  updateBook: async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/books/${id}`,
        {
          ...updatedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error updating data: " + error.message);
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/books/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error deleting data: " + error.message);
    }
  },

  returnRentedBook: async (userId, bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${userId}/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default BookService;
