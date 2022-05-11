import React, { useEffect, useState } from "react";
import "./listItem.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  // const trailer =
  //   "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  console.log(movie);
  useEffect(() => {
    const abortCont = new AbortController();
    const getMovie = async () => {
      try {
        let res = await axios.get(
          `/movies/find/${item}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          },
          { signal: abortCont.signal }
        );

        setMovie(res.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    };
    getMovie();

    return () => {
      abortCont.abort();
    };
  }, [item]);

  return (
    <Link to="/watch" state={{ movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <BsFillPlayFill className="icon" />
                <MdOutlineAdd className="icon" />
                <AiOutlineLike className="icon" />
                <AiOutlineDislike className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
