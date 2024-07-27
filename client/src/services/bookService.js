import { ref, get, set, update, remove, push } from "firebase/database";
import { auth, db } from "../firebase/firebaseConfig";

const user = auth.currentUser;
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

  create: async (collectionName, newData,userId) => {
    try {
      const dbRef = ref(db, collectionName);
      const newRef = push(dbRef);
      const dataWithUserId = { ...newData, userId };
      await set(newRef, dataWithUserId);
      return { id: newRef.key, ...dataWithUserId};
    } catch (error) {
      throw new Error("Error adding data: " + error.message);
    }
  },

  update: async (collectionName, id, updatedData) => {
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
};

export default BookService;
