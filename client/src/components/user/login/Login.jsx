import { useState } from "react";
import "./Login.css";

import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form onSubmit={loginSubmitHandler} className="login-form">
      <div className="container">
        <h1 className="login-title">Login</h1>

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
          <a>
            <span className="sign-up-span">Sign up Now!</span>
          </a>
        </p>
      </div>
    </form>
  );
}
