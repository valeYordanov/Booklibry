import axios from "axios";

const BookService = {
  getAll: async () => {
    try {
      const response = await axios.get(
        `https://booklibry-server.onrender.com/api/books`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error getting data: " + error.message);
    }
  },

  getOne: async (bookId) => {
    try {
      const response = await axios.get(
        `https://booklibry-server.onrender.com/api/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching book: " + error.message);
    }
  },

  fetchRecentBooks: async () => {
    try {
      const response = await axios.get(
        `https://booklibry-server.onrender.com/api/books/recent`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error getting data: " + error.message);
    }
  },

  rentBook: async (bookId, userId) => {
    try {
      const response = await axios.post(
        `https://booklibry-server.onrender.com/api/books/rent`,
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
        `https://booklibry-server.onrender.com/api/users/${userId}/books`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  create: async (formData, userId) => {
    try {
      // Append userId to the formData to be sent with the request
      formData.append("userId", userId);

      // Send the request to create the book
      const response = await axios.post(
        "https://booklibry-server.onrender.com/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Return the response data (the created book)
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      // Optionally, handle the error, e.g., show a message to the user
      throw new Error("Failed to create book. Please try again later.");
    }
  },

  uploadFileWithPresignedUrl: async ({ serverUrl, file }) => {
    try {
      // Request pre-signed URL from the server
      const response = await axios.post(`${serverUrl}/presigned-url`, {
        fileName: file.name,
        fileType: file.type,
      });

      const { uploadUrl, filePath } = response.data;

      // Upload the file directly to S3 using the pre-signed URL
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // Return the file path to store in the database
      return filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  },
  updateBook: async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://booklibry-server.onrender.com/api/books/${id}`,
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
        `https://booklibry-server.onrender.com/api/books/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error deleting data: " + error.message);
    }
  },

  returnRentedBook: async (userId, bookId) => {
    try {
      const response = await axios.delete(
        `https://booklibry-server.onrender.com/api/users/${userId}/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default BookService;
