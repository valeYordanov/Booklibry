import database from "../firebase/firebaseConfig";
import { ref, get, set, update, remove, push} from "firebase/database";



const BookService = {
    getAll: async (collectionName) => {
      try {
        const dbRef = ref(database, collectionName);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return [];
        }
      } catch (error) {
        throw new Error('Error getting data: ' + error.message);
      }
    },
  
    create: async (collectionName, newData) => {
      try {
        const dbRef = ref(database, collectionName);
        const newRef = push(dbRef);
        await set(newRef, newData);
        return { id: newRef.key, ...newData };
      } catch (error) {
        throw new Error('Error adding data: ' + error.message);
      }
    },
  
    update: async (collectionName, id, updatedData) => {
      try {
        const dbRef = ref(database, `${collectionName}/${id}`);
        await update(dbRef, updatedData);
        return { id, ...updatedData };
      } catch (error) {
        throw new Error('Error updating data: ' + error.message);
      }
    },
  
    delete: async (collectionName, id) => {
      try {
        const dbRef = ref(database, `${collectionName}/${id}`);
        await remove(dbRef);
        return id;
      } catch (error) {
        throw new Error('Error deleting data: ' + error.message);
      }
    }
  };
  
  export default BookService;