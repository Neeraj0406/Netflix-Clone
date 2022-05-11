import React, { useContext, useEffect, useState } from "react";
import "./newList.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

const NewList = () => {
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({
      ...list,
      [e.target.name]: value,
    });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    alert("New list created");
    navigate("/lists");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New List</h1>
          <form className="addProductForm">
            <div className="formLeft">
              <div className="addProductItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Popular Movies"
                  onChange={handleChange}
                  name="title"
                />
              </div>
              <div className="addProductItem">
                <label>Genre</label>
                <input
                  type="text"
                  placeholder="action"
                  onChange={handleChange}
                  name="genre"
                />
              </div>
              <div className="addProductItem">
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option> Type</option>
                  <option value="movie"> Movie</option>
                  <option value="series"> Series</option>
                </select>
              </div>
            </div>
            <div className="formRight">
              <div className="addProductItem">
                <label>Content</label>
                <select
                  multiple
                  name="content"
                  onChange={handleSelect}
                  style={{ height: "300px" }}
                >
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              <button className="addProductButton" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewList;
