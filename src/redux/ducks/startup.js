import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  startups: null,
};

const startupSlice = createSlice({
  name: "startup",
  initialState,
  reducers: {
    getNewStartups: (state) => ({ ...state, isLoading: true }),
    getNewStartupsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      startups: action.payload,
      error: null,
    }),
    getNewStartupsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addSturtupToParkingLot: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    addSturtupToParkingLotSuccess: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    addSturtupToParkingLotFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const startupReducer = startupSlice.reducer;

export const getNewStartups = () => {
  return (dispatch) => {
    dispatch(startupSlice.actions.getNewStartups());

    axios
      .get(`${API_URL}/startups`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(startupSlice.actions.getNewStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(startupSlice.actions.getNewStartupsFail(error))
      );
  };
};

export const addSturtupToParkingLot = (startupId) => {
  return (dispatch) => {
    dispatch(sturtupSlice.actions.addSturtupToParkingLot());

    axios
      .post(`${API_URL}/startups/parking-lot?startupId=${startupId}`)
      .then((r) => {
        return r.data
      })
      .then(data=>
        dispatch(sturtupSlice.actions.addSturtupToParkingLotSuccess(data)))
      .catch((error) =>
        dispatch(addSturtupToParkingLotFail(error))
      )
  }
}

export default startupReducer;
