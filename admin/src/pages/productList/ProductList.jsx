import React, { useContext, useEffect, useState } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

const ProductList = () => {
  const { movies, dispatch } = useContext(MovieContext);
  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListUser">
            <img src={params.row.img} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/product/" + params.row._id}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <MdOutlineDelete
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <Link to="/newProduct">
            <button
              className="productListEdit"
              style={{ marginBottom: "10px" }}
            >
              Create new movie
            </button>
          </Link>
          <DataGrid
            rows={movies}
            disableSelectionOnClick
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </>
  );
};
export default ProductList;
