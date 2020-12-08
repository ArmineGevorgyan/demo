import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  error: null,
  requestTypes: null,
  request: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    getContactRequestTypes: (state) => ({
      ...state,
      isLoading: true,
    }),
    getContactRequestTypesSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      requestTypes: action.payload,
    }),
    getContactRequestTypesFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    createContactRequest: (state) => ({
      ...state,
      isLoading: true,
    }),
    createContactRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      request: action.payload,
    }),
    createContactRequestFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    resetForm: (state, action) => ({
      ...state,
      isLoading: false,
      request: null,
    }),
  },
});

const contactReducer = contactSlice.reducer;

export const getContactRequestTypes = () => {
  return (dispatch) => {
    dispatch(contactSlice.actions.getContactRequestTypes());

    axios
      .get(`${API_URL}/contact-request-types`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(contactSlice.actions.getContactRequestTypesSuccess(data));
      })
      .catch((error) => {
        dispatch(contactSlice.actions.getContactRequestTypesFail(error));
      });
  };
};

export const createContactRequest = (data) => {
  return (dispatch) => {
    dispatch(contactSlice.actions.createContactRequest());

    axios
      .post(`${API_URL}/contact-requests`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(contactSlice.actions.createContactRequestSuccess(data));
      })
      .catch((error) => {
        dispatch(contactSlice.actions.createContactRequestFail(error));
      });
  };
};

export const resetForm = () => (dispatch) =>
  dispatch(contactSlice.actions.resetForm());

export default contactReducer;
