import React, { useContext, useState } from "react";
import "./list.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";

const List = () => {
  const location = useLocation();
  const list = location.state.list;
  const [updatedList, setUpdatedList] = useState(list);
  const { dispatch } = useContext(ListContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedList({
      ...updatedList,
      [e.target.name]: e.target.value,
    });
  };
  console.log(updatedList);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(updatedList, dispatch);
    alert("list updated");
    navigate("/lists");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">List</h1>
            <Link to="/newList">
              <button className="productAddButton">Create</button>
            </Link>
          </div>

          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{list._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">genre:</span>
                  <span className="productInfoValue">{list.genre}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">type:</span>
                  <span className="productInfoValue">{list?.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label htmlFor=""> List Title</label>
                <input
                  type="text"
                  placeholder={list.title}
                  onChange={handleChange}
                  name="title"
                />
                <label> Type</label>
                <input
                  type="text"
                  placeholder={list.type}
                  onChange={handleChange}
                  name="type"
                />
                <label> Genre</label>
                <input
                  type="text"
                  name="genre"
                  placeholder={list?.genre}
                  onChange={handleChange}
                />
              </div>
              <div className="productFormRight">
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

export default List;
