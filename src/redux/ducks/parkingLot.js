import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { addPipelineCard } from "./pipeline";

const initialState = {
  isLoading: false,
  loadingMore: false,
  noMoreStartups: false,
  startups: [],
  page: 0,
  nextPage: 1,
};

const parkingLotSlice = createSlice({
  name: "parkingLot",
  initialState,
  reducers: {
    getParkingLotStartups: (state) => ({ ...state, isLoading: true }),
    getParkingLotStartupsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      startups: action.payload,
      error: null,
    }),
    getParkingLotStartupsFail: (state, action) => ({
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

const parkingLotReducer = parkingLotSlice.reducer;

export const addParkingLotCard = parkingLotSlice.actions.getMoreStartupsSuccess;
export const removeParkingLotCard = parkingLotSlice.actions.removeCardSuccess;

export const getParkingLotStartups = (page = 0, size = 10) => {
  return (dispatch) => {
    dispatch(parkingLotSlice.actions.getParkingLotStartups());

    axios
      .get(`${API_URL}/startups/parking-lot?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(parkingLotSlice.actions.getParkingLotStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(parkingLotSlice.actions.getParkingLotStartupsFail(error))
      );
  };
};

export const getMoreStartups = (page, size = 10) => {
  return (dispatch) => {
    dispatch(parkingLotSlice.actions.getMoreStartups());

    axios
      .get(`${API_URL}/startups/parking-lot?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (data == undefined || data.length == 0) {
          return dispatch(parkingLotSlice.actions.noMoreStartups());
        }
        dispatch(parkingLotSlice.actions.getMoreStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(parkingLotSlice.actions.getMoreStartupsFail(error))
      );
  };
};

export const removeCard = (startup) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/interested?startupId=${startup.id}`, {})
      .then(() => {
        dispatch(parkingLotSlice.actions.removeCardSuccess(startup.id));
        dispatch(addPipelineCard([startup]));
      })
      .catch((error) =>
        dispatch(parkingLotSlice.actions.removeCardFail(error))
      );
  };
};

export default parkingLotReducer;
