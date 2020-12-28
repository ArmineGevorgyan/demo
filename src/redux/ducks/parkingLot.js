import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  addingToParkingLot: false,
  loadingMore: false,
  noMoreStartups: false,
  startups: [],
  page: 0,
  nextPage: 1,
  error: null,
};

const parkingLotSlice = createSlice({
  name: "parkingLot",
  initialState,
  reducers: {
    addStartupToParkingLotFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    setParkingLotLoading: (state, action) => ({
      ...state,
      addingToParkingLot: action.payload,
    }),
    getParkingLotStartups: (state) => ({
      ...state,
      noMoreStartups: false,
      page: 0,
      nextPage: 1,
      isLoading: true,
    }),
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

export const addStartupToParkingLot = (startup) => {
  const state = store.getState();
  const parkingLotState = state.parkingLot;

  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startup.id}/parking-lot`)
      .then(() => {
        if (parkingLotState.addingToParkingLot) {
          dispatch(getParkingLotStartups());
        } else {
          dispatch(parkingLotSlice.actions.setParkingLotLoading(false));
        }
      })
      .catch((error) => {
        dispatch(parkingLotSlice.actions.addStartupToParkingLotFail(error));
      });
  };
};

export const setParkingLotLoading = () => {
  return (dispatch) => {
    dispatch(parkingLotSlice.actions.setParkingLotLoading(true));
  };
};

export const getParkingLotStartups = (page = 0, size = 10) => {
  const state = store.getState();
  const parkingLotState = state.parkingLot;

  return (dispatch) => {
    dispatch(parkingLotSlice.actions.getParkingLotStartups());

    axios
      .get(`${API_URL}/startups/parking-lot?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (parkingLotState.addingToParkingLot) {
          dispatch(parkingLotSlice.actions.setParkingLotLoading(false));
        }
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

export const removeCard = (startupId) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startupId}/interested`, {})
      .then(() => {
        dispatch(parkingLotSlice.actions.removeCardSuccess(startupId));
      })
      .catch((error) =>
        dispatch(parkingLotSlice.actions.removeCardFail(error))
      );
  };
};

export default parkingLotReducer;
