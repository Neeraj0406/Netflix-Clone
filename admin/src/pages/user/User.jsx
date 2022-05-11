import React, { useContext, useState } from "react";
import "./user.css";
import { MdCalendarToday, MdMailOutline, MdPermIdentity } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { format } from "timeago.js";
import { UserContext } from "../../context/userContext/UserContext";
import { updateUser } from "../../context/userContext/apiCalls";

const User = () => {
  const { user: userDetails, dispatch } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(updatedUser, dispatch);
    alert("User Updated");
    navigate("/users");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>

          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={
                    user.avatar ||
                    "https://image.shutterstock.com/image-vector/profile-picture-avatar-icon-vector-260nw-1760295569.jpg"
                  }
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{user.username}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <MdPermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle"> {user.username} </span>
                </div>
                <div className="userShowInfo">
                  <MdMailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle"> {user.email} </span>
                </div>
                <div className="userShowInfo">
                  <MdCalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {format(user.createdAt)}
                  </span>
                </div>
                <div className="Admin">
                  <MdPermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.isAdmin ? "Admin" : "Not Admin"}
                  </span>
                </div>
              </div>
            </div>

            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label> Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder={user.username}
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder={user.email}
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label> Admin</label>
                    <select name="isAdmin" onChange={handleChange}>
                      <option>Type</option>
                      <option value="false">Not Admin</option>
                      <option value="true">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={
                        user.avatar ||
                        "https://image.shutterstock.com/image-vector/profile-picture-avatar-icon-vector-260nw-1760295569.jpg"
                      }
                      alt=""
                    />{" "}
                  </div>
                  <button className="userUpdateButton" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
