import React from "react";
import "./watch.scss";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <BiArrowBack />
          Home
        </div>
      </Link>

      <video className="video" autoPlay controls src={movie.video} />
    </div>
  );
};

export default Watch;
