/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token:null,
    uid: null,
    email: null,
    username: null,
  });

  useEffect(() => {
    const storedState = localStorage.getItem("authState");
    if (storedState) {
      setAuthState(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const changeAuthState = (user) => {
    const newState = {
      isAuthenticated: true,
      token:user.token,
      uid: user.uid,
      email: user.email,
      username: user.username,
    };
    setAuthState(newState);
  };

  const changeAuthStatetoLogout = () => {
    const newState = {
      isAuthenticated: false,
      token: null,
      uid: null,
      email: null,
      username: null,
    };
    setAuthState(newState);
    localStorage.removeItem("authState");
  };
  return (
    <AuthContext.Provider
      value={{ authState, changeAuthState, changeAuthStatetoLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext({});

AuthContext.displayName = "AuthContext";

export default AuthContext;
