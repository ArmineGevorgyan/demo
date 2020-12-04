import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

initialState = {
  isLoading: false,
  error: null,
  result: null,
  discussionList: [],
  draft:"",
};

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    setInput: (state, action) => ({
      ...state,
      input:action.payload,
    }),
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
      input:"",
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

export const setInput = (input) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.setInput(input));
  };
};

export const getDiscussions = (startupId) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.getDiscussions());

    axios
      .get(`${API_URL}/startups/${startupId}/discussions`)
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

export const createDiscussion = (data, navigation) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.createDiscussion());

    axios
      .post(`${API_URL}/discussions`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(discussionSlice.actions.createDiscussionSuccess(data));
        dispatch(getDiscussions(data.startup.id));
        navigation.goBack();
      })
      .catch((error) => {
        dispatch(discussionSlice.actions.createDiscussionFail(error));
      });
  };
};

export default discussionReducer;
