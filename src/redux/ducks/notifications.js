import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";
import moment from "moment";

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
      noMoreNotifications: false,
      page: 0,
      error: null,
    }),
    getNotificationsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      notifications: action.payload,
      page: state.page + 1,
    }),
    getNotificationsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    loadMoreNotifications: (state) => ({
      ...state,
      loadingMore: true,
      page: state.page + 1,
    }),
    noMoreNotifications: (state) => ({
      ...state,
      noMoreNotifications: true,
      loadingMore: false,
    }),
    loadMoreNotificationsSuccess: (state, action) => ({
      ...state,
      loadingMore: false,
      notifications: [...state.notifications, ...action.payload],
      error:null,
    }),
    loadMoreNotificationsFail: (state, action) => ({
      ...state,
      loadingMore: false,
      error: action.payload,
    }),
  }
});

const notificationsReduser = notificationsSlice.reducer;

export const getNotifications = () => {
  return (dispatch) => {
    dispatch(notificationsSlice.actions.getNotifications());

    axios
      .get(`${API_URL}/notification-messages/current?page=0&size=10`)
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
        if (data == undefined || data.length == 0) {
          return dispatch(notificationsSlice.actions.noMoreNotifications());
        }
        dispatch(notificationsSlice.actions.loadMoreNotificationsSuccess(data));
      })
      .catch((error) => {
        dispatch(notificationsSlice.actions.loadMoreNotificationsFail(error));
      });
  }
}

export const setNotificationSeen = (id, setSeen) => {
  return (dispatch) => {
    axios.post(`${API_URL}/notification-messages/${id}/seen`).then((r) => {
      return r.data;
    })
      .then((data) => {
        setSeen();
    })
    .catch((error) => {
    });
  }
};

export default notificationsReduser;