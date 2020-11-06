import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, API_URL } from "../../config";

initialState = {
  isLoading: false,
  error: null,
  userData: null,
  profileData: null,
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
    getProfileData: (state) => ({
      ...state,
      isLoading: true,
    }),
    getProfileDataSuccess: (state, action) => ({
      ...state,
      isLoading: true,
      profileData: action.payload,
    }),
    getProfileDataFail: (state, action) => ({
      ...state,
      isLoading: true,
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
        dispatch(getProfileData(data.id));
      })
      .catch((error) => {
        dispatch(userSlice.actions.getUserDataFail(error));
      });
  };
};

export const getProfileData = (id) => {
  return (dispatch) => {
    dispatch(userSlice.actions.getProfileData());

    axios.
      get(`${API_URL}/entrepreneur-profiles/${id}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(userSlice.actions.getProfileDataSuccess(data));
      }).catch((error) => {
        dispatch(userSlice.actions.getProfileDataFail(error));
      });
  };
};

export default userReducer;