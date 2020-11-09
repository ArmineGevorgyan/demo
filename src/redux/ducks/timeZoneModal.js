import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  isModalOpen: false,
  timeZones: [],
  error: null,
};

const timeZoneModalSlice = createSlice({
  name: "timeZoneModal",
  initialState,
  reducers: {
    openModal: (state,action) => ({
      ...state,
      isModalOpen: true,
      title:action.payload.title,
    }),
    closeModal: (state) => ({
      ...state,
      isModalOpen: false,
      timeZones:[],
    }),
    loadTimeZones: (state) => ({
      ...state,
      isLoading: true,
      noMoreTimeZone: false,
      page: 1,
      error: null,
    }),
    loadTimeZonesSuccess: (state, action) => ({
      ...state,
      isLoading: false,
    timeZones: action.payload,
    }),
    loadTimeZonesFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const timeZoneModalReducer = timeZoneModalSlice.reducer;

export const openModal = (title) => {
  return (dispatch) => {
    dispatch(timeZoneModalSlice.actions.openModal({ title }));
  }
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch(timeZoneModalSlice.actions.closeModal());
  }
}

export const loadTimeZones = () => {
  return (dispatch) => {
    dispatch(timeZoneModalSlice.actions.loadTimeZones());

    axios
      .get(`${API_URL}/time-zones`)
      .then((r) => { return r.data; })
      .then((data) => {
        dispatch(timeZoneModalSlice.actions.loadTimeZonesSuccess(data));
      })
      .catch((error) => {
        dispatch(timeZoneModalSlice.actions.loadTimeZonesFail(error));
      });
  };
};

export default timeZoneModalReducer;
