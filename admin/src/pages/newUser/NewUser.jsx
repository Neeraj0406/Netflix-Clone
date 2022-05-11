import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { createUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import "./newUser.css";

const NewUser = () => {
  const [newUser, setNewUser] = useState({});
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createUser(newUser, dispatch);
    alert("New User Created");
    navigate("/users");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm">
            <div className="newUserItem">
              <lebel> Username</lebel>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="John"
                autoComplete="off"
              />
            </div>
            <div className="newUserItem">
              <lebel> Email</lebel>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                autoComplete="off"
                placeholder="john@gmail.com"
              />
            </div>
            <div className="newUserItem">
              <lebel> Password </lebel>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
              />
            </div>

            <div className="newUserItem">
              <lebel> Admin </lebel>
              <select name="isAdmin" onChange={handleChange}>
                <option>Type</option>
                <option value="false">Not Admin</option>
                <option value="true">Admin</option>
              </select>
            </div>
            <button className="newUserButton" onClick={handleCreate}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
