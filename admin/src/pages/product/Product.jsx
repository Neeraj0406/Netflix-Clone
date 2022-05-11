import React, { useContext, useState } from "react";
import "./product.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";

const Product = () => {
  const location = useLocation();
  const movie = location.state.movie;
  const navigate = useNavigate();

  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;

    setUpdatedMovie({
      ...updatedMovie,
      [e.target.name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMovie(updatedMovie, dispatch);
    navigate("/movies");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Movie</h1>
            <Link to="/newProduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>

          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={movie.img} alt="" className="productInfoImg" />
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{movie._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">genre:</span>
                  <span className="productInfoValue">{movie.genre}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">year:</span>
                  <span className="productInfoValue">{movie?.year}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">limit:</span>
                  <span className="productInfoValue">{movie.limit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label htmlFor=""> Movie Title</label>
                <input
                  type="text"
                  placeholder={movie.title}
                  name="title"
                  onChange={handleChange}
                />
                <label> Year</label>
                <input
                  type="text"
                  name="year"
                  placeholder={movie?.year}
                  onChange={handleChange}
                />
                <label> Genre</label>
                <input
                  type="text"
                  name="genre"
                  placeholder={movie?.genre}
                  onChange={handleChange}
                />
                <label> Limit</label>
                <input
                  type="text"
                  name="limit"
                  placeholder={movie?.limit}
                  onChange={handleChange}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={movie.img} alt="" className="productUploadImg" />
                </div>
                <button className="productButton" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
