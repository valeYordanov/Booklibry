import axios from "axios";

export const register = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      userData
    );
    return response.data;
  } catch (error) {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }

    throw new Error(errorMessage);
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
