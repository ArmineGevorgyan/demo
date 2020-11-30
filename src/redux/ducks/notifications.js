import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  notifications: null,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotifications: (state) => ({
      ...state,
      isLoading: true,
    }),
    getNotificationsSuccess: (state, action) => ({
      ...state,
      notifications: action.payload,
    }),
    getNotificationsFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  }
});

const notificationsReduser = notificationsSlice.reducer;

export const getNotifications = () => {
  return (dispatch) => {
    dispatch(notificationsSlice.actions.getNotifications());

    //TODO implement get notifications request
  };
};

export default notificationsReduser;