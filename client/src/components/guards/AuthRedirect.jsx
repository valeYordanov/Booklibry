/* eslint-disable react/prop-types */
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRedirect() {
  const { authState } = useContext(AuthContext);

  if (authState.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet></Outlet>;
}
