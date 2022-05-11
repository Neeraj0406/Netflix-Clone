import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserActions";

export const getUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//CREATE
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post("/auth/register", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(createUserSuccess(res.data));
  } catch (error) {
    dispatch(createUserFailure());
  }
};

//update
export const updateUser = async (user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/users/${user._id}`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

//delete
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`/users/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};
