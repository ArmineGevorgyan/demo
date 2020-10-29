import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

initialState = {
  isLoading: false,
  error: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData: (state) => ({
      ...state,
      isLoading: true,
    }),
    getUserDataSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      userData: action.payload,
    }),
    getUserDataFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  }
});

const userReducer = userSlice.reducer;

export const getUserData = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.getUserData());

    axios
      .get(`${API_URL}/user/account`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(userSlice.actions.getUserDataSuccess(data));
      })
      .catch((error) => {
        dispatch(userSlice.actions.getUserDataFail(error));
      });
  };
};

export default userReducer;