import React, { useContext, useEffect } from "react";
import "./list.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

const Listlist = () => {
  const { lists, dispatch } = useContext(ListContext);
  console.log(lists);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },

    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/list/" + params.row._id} state={{ list: params.row }}>
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
          <Link to="/newList">
            <button
              className="productListEdit"
              style={{ marginBottom: "10px" }}
            >
              Create New List
            </button>
          </Link>
          <DataGrid
            rows={lists}
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

export default Listlist;
