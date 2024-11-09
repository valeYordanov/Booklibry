import axios from "axios";

const apiUrl = "https://booklibry-server.onrender"

export const register = async (userData) => {
 try {
  const response = await axios.post(`${apiUrl}/api/users/signup`, userData);
  console.log(response.data); // Debugging response data
  return response.data;
} catch (error) {
  console.error("Error response:", error.response || error.message); // Debugging error details
  throw new Error(error.response?.data.message || "An unexpected error occurred");
}
};

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
