import React, { useEffect, useState } from "react";
import "./widgetSm.scss";
import { MdOutlineVisibility } from "react-icons/md";
import axios from "axios";

const WidgetSm = () => {
  const [newUser, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user) => {
          return (
            <li className="widgetSmListItem">
              <img
                src={
                  user.profilePic ||
                  "https://image.shutterstock.com/image-vector/profile-picture-avatar-icon-vector-260nw-1760295569.jpg"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <MdOutlineVisibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WidgetSm;
