import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  addingToPipeline: false,
  loadingMore: false,
  noMoreStartups: false,
  startups: [],
  page: 0,
  nextPage: 1,
  error: null,
};

const pipelineSlice = createSlice({
  name: "pipeline",
  initialState,
  reducers: {
    setPipelineLoading: (state, action) => ({
      ...state,
      addingToPipeline: action.payload,
    }),
    addStartupToPipelineFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    getInterestedStartups: (state) => ({
      ...state,
      noMoreStartups: false,
      page: 0,
      nextPage: 1,
      isLoading: true,
    }),
    getInterestedStartupsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      startups: action.payload,
      error: null,
    }),
    getInterestedStartupsFail: (state, action) => ({
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

const pipelineReducer = pipelineSlice.reducer;

export const setPipelineLoading = () => {
  return (dispatch) => {
    dispatch(pipelineSlice.actions.setPipelineLoading(true));
  };
};

export const addStartupToPipeline = (startup) => {
  const state = store.getState();
  const pipelineState = state.pipeline;

  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startup.id}/interested`)
      .then(() => {
        if (pipelineState.addingToPipeline) {
          dispatch(getInterestedStartups());
        } else {
          pipelineSlice.actions.setPipelineLoading(false);
        }
      })
      .catch((error) => {
        dispatch(pipelineSlice.actions.addStartupToPipelineFail(error));
      });
  };
};

export const getInterestedStartups = (page = 0, size = 10) => {
  const state = store.getState();
  const pipelineState = state.pipeline;

  return (dispatch) => {
    dispatch(pipelineSlice.actions.getInterestedStartups());

    axios
      .get(`${API_URL}/startups/interested?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (pipelineState.addingToPipeline) {
          dispatch(pipelineSlice.actions.setPipelineLoading(false));
        }
        dispatch(pipelineSlice.actions.getInterestedStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(pipelineSlice.actions.getInterestedStartupsFail(error))
      );
  };
};

export const getMoreStartups = (page, size = 10) => {
  return (dispatch) => {
    dispatch(pipelineSlice.actions.getMoreStartups());

    axios
      .get(`${API_URL}/startups/interested?page=${page}&size=${size}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (data == undefined || data.length == 0) {
          return dispatch(pipelineSlice.actions.noMoreStartups());
        }
        dispatch(pipelineSlice.actions.getMoreStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(pipelineSlice.actions.getMoreStartupsFail(error))
      );
  };
};

export const removeCard = (startupId) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startupId}/parking-lot`, {})
      .then(() => {
        dispatch(pipelineSlice.actions.removeCardSuccess(startupId));
      })
      .catch((error) => dispatch(pipelineSlice.actions.removeCardFail(error)));
  };
};

export default pipelineReducer;
