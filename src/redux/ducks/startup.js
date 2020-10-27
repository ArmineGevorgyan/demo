import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { addPipelineCard, removePipelineCard } from "./pipeline";
import { addParkingLotCard, removeParkingLotCard } from "./parkingLot";

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
      isEmpty: false,
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
    toggleIsEmpty: (state) => ({
      ...state,
      isEmpty: !state.isEmpty,
    })
  },
});

const startupReducer = startupSlice.reducer;

export const toggleIsEmpty = () => {
  return dispatch => dispatch(startupSlice.actions.toggleIsEmpty());
};

export const getNewStartups = () => {
  return (dispatch) => {
    dispatch(startupSlice.actions.getNewStartups());

    axios
      .get(`${API_URL}/startups/new`)
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

export const addStartupToParkingLot = (startup) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/parking-lot?startupId=${startup.id}`)
      .then(() => {
        dispatch(addParkingLotCard([startup]));
        dispatch(removePipelineCard(startup.id));
      })
      .catch((error) => {
        dispatch(startupSlice.actions.addStartupToParkingLotFail(error));
      });
  };
};

export const addStartupToPipeline = (startup) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/interested?startupId=${startup.id}`)
      .then(() => {
        dispatch(addPipelineCard([startup]));
        dispatch(removeParkingLotCard(startup.id));
      })
      .catch((error) => {
        dispatch(startupSlice.actions.addStartupToPipelineFail(error));
      });
  };
};

export default startupReducer;
