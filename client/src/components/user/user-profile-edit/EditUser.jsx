import { useCallback, useEffect, useState } from "react";
import "./EditUser.css";
import { getUser, updateUser } from "../../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext";

export default function EditUser() {
  const { userId } = useParams();

  const navigate = useNavigate();
  const { authState,changeAuthState } = useContext(AuthContext);

  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    tel: "",
    country: "",
  });

  const [IsError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEditedData = async () => {
      const result = await getUser(userId);

      setEditedUser(result);
    };
    fetchEditedData();
  }, [userId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

  const submitEditUserHandler = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(editedUser).some(
      (value) => value === "" || value === null || value === undefined
    );

    if (hasEmptyFields) {
      setIsError(true);
      return;
    }

    try {
      const updatedUser = await updateUser(userId, editedUser, authState.token);

      // Store the new token if it's provided
      if (updatedUser.token) {
        localStorage.setItem("authToken", updatedUser.token);
      }
      
      changeAuthState(updatedUser)

      navigate(`/user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const goBackHandler = () => {
    navigate(`/user-profile/${userId}`);
  };

  return (
    <div className="profile-details-edit">
      <form onSubmit={submitEditUserHandler} className="edit-profile-form">
        <h1 className="edit-title">Edit profile details</h1>
        {IsError && <p className="fill-error">Please fill all fields!</p>}

        <label htmlFor="">Username:</label>
        <input
          type="text"
          name="username"
          value={editedUser.username}
          onChange={handleChange}
        />
        <label htmlFor="">Email:</label>
        <input
          type="text"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
        />

        <label htmlFor="">Country:</label>
        <input
          type="text"
          name="country"
          value={editedUser.country}
          onChange={handleChange}
        />

        <label htmlFor="">Telephone Number:</label>
        <input
          type="text"
          name="tel"
          value={editedUser.tel}
          onChange={handleChange}
        />

        <div className="profile-buttons">
          <button className="update-profile">Update Profile</button>
          <button onClick={goBackHandler} className="go-back">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
