import { useEffect } from "react";
import { logout } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function logingOut() {
      try {
        await logout();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    logingOut()
  });
  return null;
}
