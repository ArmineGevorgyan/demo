import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

initialState = {
  isLoading: false,
  error: null,
  result: null,
  updateList: null,
  input: "",
  draft: "",
};

const updateSlice = createSlice({
  name: "update",
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
    getUpdates: (state) => ({
      ...state,
      isLoading: true,
    }),
    getUpdatesSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      updateList: action.payload,
    }),
    getUpdatesFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    createUpdate: (state) => ({
      ...state,
      isLoading: true,
      result: null,
    }),
    createUpdateSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      input: "",
      result: action.payload,
    }),
    createUpdateFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const updateReducer = updateSlice.reducer;

export const setInput = (input) => {
  return (dispatch) => {
    dispatch(updateSlice.actions.setInput(input));
  };
};

export const setComment = (input) => {
  return (dispatch) => {
    dispatch(updateSlice.actions.setComment(input));
  };
};

export const getUpdates = (startupId) => {
  return (dispatch) => {
    dispatch(updateSlice.actions.getUpdates());

    axios
      .get(`${API_URL}/startups/${startupId}/updates`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(updateSlice.actions.getUpdatesSuccess(data));
      })
      .catch((error) => {
        dispatch(updateSlice.actions.getUpdatesFail(error));
      });
  };
};

export const createUpdate = (data, startupId, navigation) => {
  return (dispatch) => {
    dispatch(updateSlice.actions.createUpdate());

    axios
      .post(`${API_URL}/startups/${startupId}/updates`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(updateSlice.actions.createUpdateSuccess(data));
        dispatch(getUpdates(startupId));
        navigation.goBack();
      })
      .catch((error) => {
        dispatch(updateSlice.actions.createUpdateFail(error));
      });
  };
};

export default updateReducer;
