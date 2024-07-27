import { useContext, useState } from "react";
import "./Register.css";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext";

// import {ToasterContainer} from 'react-toastify'

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    country: "",
    tel: "",
  });

  const [errors, setErrors] = useState({});
  const { changeAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.tel) {
      newErrors.tel = "Telephone number is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    const newErrors = validate();
    setErrors(newErrors);
    e.preventDefault();
    setApiError("");
    if (Object.keys(newErrors).length === 0) {
      try {
        const { email, password, ...additionalData } = formData;
        const user = await register(email, password, additionalData);

        changeAuthState({
          uid: user.uid,
          email: user.email,
          
        });

        localStorage.setItem("token", user.token);
        navigate("/");
      } catch (error) {
        setApiError(error.message);
        console.log(apiError);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="container-form">
        <h1 className="register-title">Register</h1>

        {apiError && <div className="apierror">{apiError}</div>}

        {errors.email && <div className="error-container">{errors.email}</div>}
        <input
          className="email"
          type="text"
          placeholder="Enter Email..."
          name="email"
          value={formData.email}
          onChange={changeHandler}
        />
        {errors.username && (
          <div className="error-container">{errors.username}</div>
        )}
        <input
          className="username"
          type="text"
          placeholder="Enter username..."
          name="username"
          value={formData.username}
          onChange={changeHandler}
        />
        {errors.password && (
          <div className="error-container">{errors.password}</div>
        )}

        <input
          className="password"
          type="password"
          placeholder="Enter Password..."
          name="password"
          value={formData.password}
          onChange={changeHandler}
        />
        {errors.country && (
          <div className="error-container">{errors.country}</div>
        )}
        <input
          className="country"
          type="text"
          placeholder="Enter country..."
          name="country"
          value={formData.country}
          onChange={changeHandler}
        />
        {errors.tel && <div className="error-container">{errors.tel}</div>}
        <input
          className="tel"
          type="text"
          placeholder="Enter number..."
          name="tel"
          value={formData.tel}
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
