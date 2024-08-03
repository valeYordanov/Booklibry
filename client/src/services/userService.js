import { get, ref, update } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export const getUser = async (userId) => {
  try {
    const dbRef = ref(db, `users/${userId}`);

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error getting data: " + error.massage);
  }
};

export const updateUser = async (collectionName, id, updatedData) => {
  try {
    const dbRef = ref(db, `${collectionName}/${id}`);
    await update(dbRef, updatedData);
    
  } catch (error) {
    throw new Error("Error updating data: " + error.message);
  }
};

