import { useContext, useState } from "react";
import "./Login.css";

import { login } from "../../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { changeAuthState } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");

  const loginSubmitHandler = async (e) => {
    setApiError("");
    e.preventDefault();
    const { email, password } = values;
    try {
      const user = await login(email, password);
      changeAuthState({
        uid: user.uid,
        email: user.email,
      });
      localStorage.setItem("token", user.token);
      navigate("/");
    } catch (error) {
      setApiError(error.message);
    }
  };

  const handleChange = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));

    setApiError("");
  };
  return (
    <form onSubmit={loginSubmitHandler} className="login-form">
      <div className="container">
        <h1 className="login-title">Login</h1>
        {apiError && <div className="apierror">{apiError}</div>}
        <input
          className="email"
          type="text"
          placeholder="Enter email..."
          name="email"
          value={values.email}
          onChange={handleChange}
        />

        <input
          className="password"
          type="password"
          placeholder="Enter Password..."
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button className="login">Login</button>
        <p>
          Not our Client yet?
          <Link to={"/register"}>
            <span className="sign-up-span">Sign up Now!</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
