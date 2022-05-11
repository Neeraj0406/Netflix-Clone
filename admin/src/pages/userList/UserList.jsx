import React, { useContext, useEffect, useState } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../dummyData";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteUser, getUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import { format } from "timeago.js";

const UserList = () => {
  const { user, dispatch } = useContext(UserContext);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              src={
                params.row.avatar ||
                "https://image.shutterstock.com/image-vector/profile-picture-avatar-icon-vector-260nw-1760295569.jpg"
              }
              alt=""
              className="userListImg"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isAdmin", headerName: "Is Admin", width: 130 },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <p> {format(params.row.createdAt)}</p>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={{ user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <MdOutlineDelete
              className="userListDelete"
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
        <div className="userList">
          .
          <Link to="/newUser">
            <button
              className="userAddButton"
              style={{ marginBottom: "15px", width: "auto" }}
            >
              Create New User
            </button>
          </Link>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={user}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(r) => r._id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
