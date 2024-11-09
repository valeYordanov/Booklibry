import axios from "axios";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error getting data: " + error.massage);
  }
};

export const updateUser = async (userId, updatedData, token) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/${userId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if a new token was returned
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
