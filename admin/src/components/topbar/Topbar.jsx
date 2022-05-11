import React from "react";
import "./topbar.scss";
import { IoIosNotifications } from "react-icons/io";
import { MdLanguage, MdSettings } from "react-icons/md";
const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>

        <div className="topright">
          <div className="topbarIconContainer">
            <IoIosNotifications />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <MdLanguage />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <MdSettings />
          </div>
          <img
            src="https://images.pexels.com/photos/9802281/pexels-photo-9802281.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
