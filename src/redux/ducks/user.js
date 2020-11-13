import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { getProfileData } from "../ducks/entrepreneurProfile";

initialState = {
  isLoading: false,
  error: null,
  userData: null,
  profileData: null,
  deleteAccountModalOpen: false,
  deleteRequestSent: false,
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
    updateUserData: (state) => ({
      ...state,
      isLoading: true,
    }),
    updateUserData: (state) => ({
      ...state,
      isLoading: true,
    }),
    deleteAccountRequest: (state) => ({
      ...state,
      isLoading: true,
      deleteRequestSent: false,
    }),
    deleteAccountRequestSuccess: (state) => ({
      ...state,
      isLoading: false,
      deleteRequestSent: true,
    }),
    deleteAccountRequestFail: (state, action) => ({
      ...state,
      isLoading: false,
      deleteRequestSent: false,
      error: action.payload,
    }),
    openDeleteAccountModal: (state) => ({
      ...state,
      deleteRequestSent: false,
      deleteAccountModalOpen: true,
    }),
    closeDeleteAccountModal: (state) => ({
      ...state,
      deleteAccountModalOpen: false,
      request: null,
    }),
  },
});

const userReducer = userSlice.reducer;

export const closeDeleteAccountModal = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.closeDeleteAccountModal());
  };
};

export const openDeleteAccountModal = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.openDeleteAccountModal());
  };
};

export const deleteAccountRequest = (data) => {
  return (dispatch) => {
    dispatch(userSlice.actions.deleteAccountRequest());

    // TODO: change the request to delete the account
    axios
      .get(`${API_URL}/user/account`)
      .then(() => {
        dispatch(userSlice.actions.deleteAccountRequestSuccess());
      })
      .catch((error) => {
        dispatch(userSlice.actions.deleteAccountRequestFail(error));
      });
  };
};

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
        dispatch(getProfileData());
      })
      .catch((error) => {
        dispatch(userSlice.actions.getUserDataFail(error));
      });
  };
};

export const updateUserData = (fullName) => {
  return (dispatch) => {
    dispatch(userSlice.actions.updateUserData());

    axios
      .put(`${API_URL}/user/account`, fullName)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(userSlice.actions.getUserDataSuccess(data));
        dispatch(getProfileData());
      })
      .catch((error) => {
        dispatch(userSlice.actions.getUserDataFail(error));
      });
  };
};

export default userReducer;
