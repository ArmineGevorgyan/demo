import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  hidePassword: true,
  hidePasswordConfirmation: true,
  request: null,
  user: null,
  error: null,
  password: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    register: (state) => ({
      ...state,
      isLoading: true,
    }),
    registrationSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      user: action.payload,
      error: null,
    }),
    registrationFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    togglePassword: (state) => ({
      ...state,
      hidePassword: !state.hidePassword,
    }),
    togglePasswordConfirmation: (state) => ({
      ...state,
      hidePasswordConfirmation: !state.hidePasswordConfirmation,
    }),
    getInviteRequest: (state) => ({
      ...state,
      isLoading: true,
    }),
    getInviteRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      request: action.payload,
      error: null,
    }),
    getInviteRequestFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    setPassword: (state, action) => ({
      ...state,
      password: action.payload,
    }),
  },
});

const registrationReducer = registrationSlice.reducer;

export const togglePassword = () => {
  return (dispatch) => {
    dispatch(registrationSlice.actions.togglePassword());
  };
};

export const togglePasswordConfirmation = () => {
  return (dispatch) => {
    dispatch(registrationSlice.actions.togglePasswordConfirmation());
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(registrationSlice.actions.register());
    dispatch(registrationSlice.actions.setPassword(data.password));
    axios
      .post(`${API_URL}/register`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(registrationSlice.actions.registrationSuccess(data));
      })
      .catch((error) =>
        dispatch(registrationSlice.actions.registrationFail(error))
      );
  };
};

export const getInviteRequest = (email, invitationToken) => {
  return (dispatch) => {
    dispatch(registrationSlice.actions.getInviteRequest());

    axios
      .get(
        `${API_URL}/public/invitation-requests/${email}?invitationToken=${invitationToken}`
      )
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(registrationSlice.actions.getInviteRequestSuccess(data));
      })
      .catch((error) =>
        dispatch(registrationSlice.actions.getInviteRequestFail(error))
      );
  };
};

export default registrationReducer;
