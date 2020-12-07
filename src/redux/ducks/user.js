import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import constants from "../../constants";
import { getProfileData as getEntrepreneurData } from "../ducks/entrepreneurProfile";
import { getProfileData as getInvestorData } from "../ducks/investorProfile";
import store from "../store";

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
    setUserPushToken: (state) => ({
      ...state,
      isLoading: true,
    }),
    setUserPushTokenSuccess: (state) => ({
      ...state,
      isLoading: false,
    }),
    setUserPushTokenFail: (state, action) => ({
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
    clearUserData: (state) => ({
      ...state,
      userData: null,
      profileData: null,
    }),
  },
});

const userReducer = userSlice.reducer;

export const clearUserData = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.clearUserData());
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

export const setUserPushToken = (token) => {
  return (dispatch) => {
    dispatch(userSlice.actions.setUserPushToken());

    axios
      .post(`${API_URL}/account/notification-tokens`, { value: token })
      .then(() => {
        dispatch(userSlice.actions.setUserPushTokenSuccess());
      })
      .catch((error) => {
        dispatch(userSlice.actions.setUserPushTokenFail(error));
      });
  };
};

const getProfileData = () => {
  const state = store.getState();
  const userRole = state.user?.userData?.authorities[0];

  return (dispatch) => {
    userRole == constants.userRole.investor
      ? dispatch(getInvestorData())
      : dispatch(getEntrepreneurData());
  };
};

export default userReducer;
