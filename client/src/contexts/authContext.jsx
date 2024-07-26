/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { register } from "../services/authService";
import { validateForErrors } from "../util";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    uid: null,
    email: null,
    username: null,
  });

  const changeAuthState = (user) => {
    setAuthState({
      isAuthenticated: true,
      token: user.token,
      uid: user.uid,
      email: user.email,
      username: user.username,
    });
  };

  const changeAuthStatetoLogout = () => {
        setAuthState({
          isAuthenticated: false,
          token: null,
          uid: null,
          email: null,
          username: null,
        })
  }
  return (
    <AuthContext.Provider value={{ authState, changeAuthState,changeAuthStatetoLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext({});

AuthContext.displayName = "AuthContext";

export default AuthContext;
