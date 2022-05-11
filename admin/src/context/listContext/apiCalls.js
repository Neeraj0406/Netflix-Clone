import axios from "axios";
import {
  CreateListFailure,
  CreateListStart,
  CreateListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    dispatch(getListsFailure());
  }
};

//Create
export const createList = async (list, dispatch) => {
  dispatch(CreateListStart());

  try {
    const res = await axios.post("/lists", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(CreateListSuccess(res.data));
  } catch (error) {
    dispatch(CreateListFailure());
  }
};

//update List
export const updateList = async (list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put("/lists/" + list._id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(updateListSuccess(res.data));
  } catch (error) {
    dispatch(updateListFailure());
  }
};

//delete List
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};
