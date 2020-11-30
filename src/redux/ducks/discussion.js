import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

initialState = {
  isLoading: false,
  error: null,
  result: null,
  discussionList: [],
};

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    getDiscussions: (state) => ({
      ...state,
      discussionList: [],
      isLoading: true,
    }),
    getDiscussionsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      discussionList: action.payload,
    }),
    getDiscussionsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    createDiscussion: (state) => ({
      ...state,
      isLoading: true,
      result: null,
    }),
    createDiscussionSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      result: action.payload,
    }),
    createDiscussionFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const discussionReducer = discussionSlice.reducer;

export const getDiscussions = (startupId) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.getDiscussions());

    uri = startupId ? `?startupId=${startupId}` : "/all";

    axios
      .get(`${API_URL}/discussion${uri}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(discussionSlice.actions.getDiscussionsSuccess(data));
      })
      .catch((error) => {
        dispatch(discussionSlice.actions.getDiscussionsFail(error));
      });
  };
};

export const createDiscussion = (data) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.createDiscussion());

    axios
      .post(`${API_URL}/discussion`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(discussionSlice.actions.createDiscussionSuccess(data));
      })
      .catch((error) => {
        dispatch(discussionSlice.actions.createDiscussionFail(error));
      });
  };
};

export default discussionReducer;
