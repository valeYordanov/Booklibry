import { useEffect, useState } from "react";
import "./EditUser.css";
import { getUser, updateUser } from "../../../services/userService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    tel: "",
  });

  useEffect(() => {
    const fetchEditedData = async () => {
      const result = await getUser(userId);

      setEditedUser(result);
    };
    fetchEditedData();
  }, [userId]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setEditedUser((...prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitEditUserHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser("users", userId, editedUser);

      navigate(`/user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-details-edit">
      <form onSubmit={submitEditUserHandler} className="edit-profile-form">
        <h1 className="edit-title">Edit profile details</h1>

        <label htmlFor="">Username:</label>
        <input
          type="text"
          name="username"
          value={editedUser.username}
          onChange={changeHandler}
        />
        <label htmlFor="">Email:</label>
        <input
          type="text"
          name="email"
          value={editedUser.email}
          onChange={changeHandler}
        />

        <label htmlFor="">Country:</label>
        <input
          type="text"
          name="country"
          value={editedUser.country}
          onChange={changeHandler}
        />

        <label htmlFor="">Telephone Number:</label>
        <input
          type="text"
          name="tel"
          value={editedUser.tel}
          onChange={changeHandler}
        />

        <div className="profile-buttons">
          <button className="update-profile">Update Profile</button>
          <button className="go-back">Go Back</button>
        </div>
      </form>
    </div>
  );
}