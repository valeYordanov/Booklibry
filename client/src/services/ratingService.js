import  database  from '../firebase/firebaseConfig.js'
import { ref, get, set, push} from "firebase/database";

const FirebaseService = {
  getAllRatings: async (bookId) => {
    try {
      const dbRef = ref(database, `books/${bookId}/ratings`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      throw new Error('Error getting ratings: ' + error.message);
    }
  },

  addRating: async (bookId, newRating) => {
    try {
      const dbRef = ref(database, `books/${bookId}/ratings`);
      const newRef = push(dbRef);
      await set(newRef, newRating);
      return { id: newRef.key, ...newRating };
    } catch (error) {
      throw new Error('Error adding rating: ' + error.message);
    }
  }
};

export default FirebaseService;