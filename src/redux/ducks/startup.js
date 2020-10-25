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
    addStartupToParkingLotFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    addStartupToPipelineFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
});

const startupReducer = startupSlice.reducer;

export const getNewStartups = () => {
  return (dispatch) => {
    dispatch(startupSlice.actions.getNewStartups());

    axios
      .get(`${API_URL}/startups/new`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        console.log("in get new Startups data ===== ", data);
        dispatch(startupSlice.actions.getNewStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(startupSlice.actions.getNewStartupsFail(error))
      );
  };
};

export const addStartupToParkingLot = (startupId) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/parking-lot?startupId=${startupId}`)
      .then((r) => {
        return r.data
      })
      .then(data => {
        //TODO leaving this space to handle success response
      })
      .catch((error) => {
        dispatch(startupSlice.actions.addStartupToParkingLotFail(error))
      });
  };
};

export const addStartupToPipeline = (startupId) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/interested?startupId=${startupId}`).then((r) => {
        return r.data
      })
      .then(data => {
        //TODO leaving this space to handle success response
      })
      .catch((error) => {
        dispatch(startupSlice.actions.addStartupToPipelineFail(error))
      });
  };
};

export default startupReducer;
