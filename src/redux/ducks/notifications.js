import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  loadingMore: false,
  notifications: null,
  noMoreNotifications: false,
  page: 0,
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
      isLoading: false,
      notifications: action.payload,
    }),
    getNotificationsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    loadMoreNotifications: (state) => ({
      ...state,
      loadingMore: true,
    }),
    noMoreNotifications: (state) => ({
      ...state,
      noMoreNotifications: true,
      loadingMore: false,
    }),
    loadMoreNotificationsSuccess: (state, action) => ({
      ...state,
      page: state.page + 1,
      notifications: [...state.notifications, ...action.payload]
    }),
    loadMoreNotificationsFail: (state, action) => ({
      ...state,
      loadingMore:false,
      error: action.payload,
    }),
  }
});

const notificationsReduser = notificationsSlice.reducer;

export const getNotifications = () => {
  return (dispatch) => {
    dispatch(notificationsSlice.actions.getNotifications());

    axios
      .get(`${API_URL}/notification-messages/current?page=0&size=5`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(notificationsSlice.actions.getNotificationsSuccess(data));
      })
      .catch((error) => {
        dispatch(notificationsSlice.actions.getNotificationsFail(error));
      });
  };
};

export const loadMoreNotifications = () => {
  const state = store.getState();
  const notificationsState = state.notifications;
  return (dispatch) => {
    dispatch(notificationsSlice.actions.loadMoreNotifications());

    axios
      .get(`${API_URL}/notification-messages/current?page=${notificationsState.page}&size=10`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(notificationsSlice.actions.loadMoreNotificationsSuccess(data));
      })
      .catch((error) => {
        dispatch(notificationsSlice.actions.loadMoreNotificationsFail(error));
      });
  }
}

export default notificationsReduser;