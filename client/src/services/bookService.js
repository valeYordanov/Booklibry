import {
  ref,
  get,
  set,
  update,
  remove,
  push,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { db } from "../firebase/firebaseConfig";

const BookService = {
  getAll: async (collectionName) => {
    try {
      const dbRef = ref(db, collectionName);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error getting data: " + error.message);
    }
  },

  getOne: async (bookId) => {
    try {
      const dbRef = ref(db, `books/${bookId}`);

      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error getting data: " + error.massage);
    }
  },

  fetchRecentBooks: async () => {
    try {
      const dbRef = ref(db, "books");
      const recentBooksQuery = query(
        dbRef,
        orderByChild("timestamp"),
        limitToLast(3)
      );
      const snapshot = await get(recentBooksQuery);

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching recent books:", error);
    }
  },

  rentBook: async (userId, book, bookId) => {
    const userRentBookRef = ref(db, `users/${userId}/rentedBooks/${bookId}`);

    await set(userRentBookRef, { ...book , isRented:true});
  },

  getRentedBooks: async (userId) => {
    try {
      const dbRef = ref(db, `users/${userId}/rentedBooks`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  create: async (collectionName, newData, userId) => {
    try {
      const dbRef = ref(db, collectionName);
      const newRef = push(dbRef);
      const timestamp = Date.now();
      const dataWithUserIdAndTimestamp = { ...newData, userId, timestamp };

      await set(newRef, dataWithUserIdAndTimestamp);
      return { id: newRef.key, ...dataWithUserIdAndTimestamp };
    } catch (error) {
      throw new Error("Error adding data: " + error.message);
    }
  },

  updateBook: async (collectionName, id, updatedData) => {
    try {
      const dbRef = ref(db, `${collectionName}/${id}`);
      await update(dbRef, updatedData);
      return { id, ...updatedData };
    } catch (error) {
      throw new Error("Error updating data: " + error.message);
    }
  },

  delete: async (collectionName, id) => {
    try {
      const dbRef = ref(db, `${collectionName}/${id}`);
      await remove(dbRef);
      return id;
    } catch (error) {
      throw new Error("Error deleting data: " + error.message);
    }
  },

  returnRentedBook: async (userId, bookId) => {
    const dbRef = ref(db, `users/${userId}/rentedBooks/${bookId}`);
    await remove(dbRef);
  },
};

export default BookService;
