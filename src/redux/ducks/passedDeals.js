import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  addingToPassedDeals: false,
  loadingMore: false,
  noMoreStartups: false,
  startups: [],
  page: 0,
  nextPage: 1,
  error: null,
};

const passedDealsSlice = createSlice({
  name: "passedDeals",
  initialState,
  reducers: {
    addStartupToPassedDealsFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    setPassedDealsLoading: (state, action) => ({
      ...state,
      addingToPassedDeals: action.payload,
    }),
    getPassedDealsStartups: (state) => ({
      ...state,
      noMoreStartups: false,
      page: 0,
      nextPage: 1,
      isLoading: true,
    }),
    getPassedDealsStartupsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      startups: action.payload,
      error: null,
    }),
    getPassedDealsStartupsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    removeCardSuccess: (state, action) => ({
      ...state,
      startups: state.startups.filter((s) => s.id != action.payload),
      error: null,
    }),
    removeCardFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    getMoreStartups: (state) => ({
      ...state,
      loadingMore: true,
      page: state.page + 1,
      nextPage: state.nextPage + 1,
    }),
    noMoreStartups: (state) => ({
      ...state,
      noMoreStartups: true,
      loadingMore: false,
    }),
    getMoreStartupsSuccess: (state, action) => ({
      ...state,
      loadingMore: false,
      startups: [...state.startups, ...action.payload],
      error: null,
    }),
    getMoreStartupsFail: (state, action) => ({
      ...state,
      loadingMore: false,
      error: action.payload,
    }),
  },
});

const passedDealsReducer = passedDealsSlice.reducer;

export const addStartupToPassedDeals = (startup) => {
  const state = store.getState();
  const passedDealsState = state.passedDeals;

  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startup.id}/parking-lot`)
      .then(() => {
        if (passedDealsState.addingToPassedDeals) {
          dispatch(getPassedDealsStartups());
        } else {
          dispatch(passedDealsSlice.actions.setPassedDealsLoading(false));
        }
      })
      .catch((error) => {
        dispatch(passedDealsSlice.actions.addStartupToPassedDealsFail(error));
      });
  };
};

export const setPassedDealsLoading = () => {
  return (dispatch) => {
    dispatch(passedDealsSlice.actions.setPassedDealsLoading(true));
  };
};

export const getPassedDealsStartups = (page = 0, size = 10) => {
  const state = store.getState();
  const passedDealsState = state.passedDeals;

  return (dispatch) => {
    dispatch(passedDealsSlice.actions.getPassedDealsStartups());

    axios
      .get(`${API_URL}/startups/parking-lot?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (passedDealsState.addingToPassedDeals) {
          dispatch(passedDealsSlice.actions.setPassedDealsLoading(false));
        }
        dispatch(passedDealsSlice.actions.getPassedDealsStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(passedDealsSlice.actions.getPassedDealsStartupsFail(error))
      );
  };
};

export const getMoreStartups = (page, size = 10) => {
  return (dispatch) => {
    dispatch(passedDealsSlice.actions.getMoreStartups());

    axios
      .get(`${API_URL}/startups/parking-lot?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (data == undefined || data.length == 0) {
          return dispatch(passedDealsSlice.actions.noMoreStartups());
        }
        dispatch(passedDealsSlice.actions.getMoreStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(passedDealsSlice.actions.getMoreStartupsFail(error))
      );
  };
};

export const removeCard = (startupId) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startupId}/interested`, {})
      .then(() => {
        dispatch(passedDealsSlice.actions.removeCardSuccess(startupId));
      })
      .catch((error) =>
        dispatch(passedDealsSlice.actions.removeCardFail(error))
      );
  };
};

export default passedDealsReducer;
