import { useState } from "react";
import "./Register.css";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    country: "",
    tel: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForErrors = () => {
    const newErrors = {};

    if (!values.email) newErrors.email = "Email is required!";
    if (!values.username) newErrors.username = "Username is required!";
    if (!values.password) newErrors.password = "Password is required!";
    if (!values.country) newErrors.country = "Country is required!";
    if (!values.tel || isNaN(values.tel))
      newErrors.tel = "Please add a valid number!";

    return newErrors;
  };
  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    const newErrors = validateForErrors();

    setErrors(newErrors);

    try {
      if (Object.keys(newErrors).length === 0) {
        const { email, password, ...additionalData } = values;
        await register(email, password, additionalData);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={submitRegisterHandler} className="register-form">
      <div className="container-form">
        <h1 className="register-title">Register</h1>
        {errors.email && <span>{errors.email}</span>}
        <input
          className="email"
          type="text"
          placeholder="Enter Email..."
          name="email"
          value={values.email}
          onChange={changeHandler}
        />
        {errors.username && <span>{errors.username}</span>}
        <input
          className="username"
          type="text"
          placeholder="Enter username..."
          name="username"
          value={values.username}
          onChange={changeHandler}
        />
        {errors.password && <span>{errors.password}</span>}
        <input
          className="password"
          type="password"
          placeholder="Enter Password..."
          name="password"
          value={values.password}
          onChange={changeHandler}
        />
        {errors.country && <span>{errors.country}</span>}
        <input
          className="country"
          type="text"
          placeholder="Enter country..."
          name="country"
          value={values.country}
          onChange={changeHandler}
        />
        {errors.tel && <span>{errors.tel}</span>}
        <input
          className="tel"
          type="text"
          placeholder="Enter number..."
          name="tel"
          value={values.tel}
          onChange={changeHandler}
        />

        <button className="register">Register</button>
        <p>
          Already have an accout?
          <a>
            <span className="login-span">Login!</span>
          </a>
        </p>
      </div>
    </form>
  );
}
