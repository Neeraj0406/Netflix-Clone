import React from "react";
import "./sidebar.scss";
import {
  MdLineStyle,
  MdTimeline,
  MdTrendingUp,
  MdPermIdentity,
  MdBarChart,
  MdMailOutline,
  MdDynamicFeed,
  MdChatBubbleOutline,
  MdWorkOutline,
  MdReport,
  MdPlayArrow,
  MdList,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={` sidebarListItem ${
                  window.location.pathname === "/" ? "active" : ""
                } `}
              >
                <MdLineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <MdTimeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <MdTrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={` sidebarListItem ${
                  window.location.pathname === "/users" ? "active" : ""
                } `}
              >
                <MdPermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li
                className={` sidebarListItem ${
                  window.location.pathname === "/movies" ? "active" : ""
                } `}
              >
                <MdPlayArrow className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li
                className={` sidebarListItem ${
                  window.location.pathname === "/lists" ? "active" : ""
                } `}
              >
                <MdList className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <li className="sidebarListItem">
              <MdBarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notification</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MdMailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <MdDynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <MdChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Stuff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MdWorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <MdTimeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <MdReport className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
