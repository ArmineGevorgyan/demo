import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

initialState = {
  isLoading: false,
  error: null,
  result: null,
  discussionList: null,
  input: "",
  draft: "",
  comment: "",
};

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    setInput: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    setComment: (state, action) => ({
      ...state,
      comment: action.payload,
    }),
    getDiscussions: (state) => ({
      ...state,
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
      input: "",
      result: action.payload,
    }),
    createDiscussionFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addComment: (state) => ({
      ...state,
      isLoading: true,
    }),
    addCommentSuccess: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    addCommentFail: (state, action) => ({
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

export const setComment = (input) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.setComment(input));
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

export const createDiscussion = (data, startupId, navigation) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.createDiscussion());

    axios
      .post(`${API_URL}/startups/${startupId}/discussions`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(discussionSlice.actions.createDiscussionSuccess(data));
        dispatch(getDiscussions(startupId));
        navigation.goBack();
      })
      .catch((error) => {
        dispatch(discussionSlice.actions.createDiscussionFail(error));
      });
  };
};

export const addComment = (info) => {
  return (dispatch) => {
    dispatch(discussionSlice.actions.addComment());

    axios
      .post(`${API_URL}/discussions/${info.id}/replies`, {
        content: info.content,
      })
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(discussionSlice.actions.addCommentSuccess(data));
        dispatch(getDiscussionById(info.id, info.navigation));
      })
      .catch((error) => {
        dispatch(discussionSlice.actions.addCommentFail(error));
      });
  };
};

export const getDiscussionById = (id, navigation) => {
  const state = store.getState();
  const discussinState = state.discussion;

  return (dispatch) => {
    axios
      .get(`${API_URL}/discussions/${id}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        const updatedDiscussions = discussinState.discussionList.map(
          (discussion) => {
            if (discussion.id == id) {
              discussion = data;
            }
            return discussion;
          }
        );
        navigation.goBack();
        dispatch(
          discussionSlice.actions.getDiscussionsSuccess(updatedDiscussions)
        );
        dispatch(discussionSlice.actions.setComment(""));
      })
      .catch((error) => {
        dispatch(discussionSlice.actions.addCommentFail(error));
      });
  };
};

export default discussionReducer;
