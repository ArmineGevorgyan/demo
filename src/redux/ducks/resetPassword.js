import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  hidePassword: true,
  hidePasswordConfirmation: true,
  success: false,
  emailSent: false,
  validToken: null,
  error: null,
  isModalOpen: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetPassword: (state) => ({
      ...state,
      isLoading: true,
      success: false,
    }),
    resetPasswordSuccess: (state) => ({
      ...state,
      isLoading: false,
      success: true,
      error: null,
    }),
    resetPasswordFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    }),
    checkResetToken: (state) => ({
      ...state,
      isLoading: true,
      validToken: null,
    }),
    checkResetTokenSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      validToken: action.payload,
      error: null,
    }),
    checkResetTokenFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      validToken: null,
    }),
    getResetLink: (state) => ({
      ...state,
      isLoading: true,
      emailSent: false,
    }),
    getResetLinkSuccess: (state) => ({
      ...state,
      isLoading: false,
      emailSent: true,
      error: null,
    }),
    getResetLinkFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      emailSent: false,
    }),
    togglePassword: (state) => ({
      ...state,
      hidePassword: !state.hidePassword,
    }),
    togglePasswordConfirmation: (state) => ({
      ...state,
      hidePasswordConfirmation: !state.hidePasswordConfirmation,
    }),
    openModal: (state) => ({
      ...state,
      isModalOpen: true,
    }),
    closeModal: (state) => ({
      ...state,
      isModalOpen: false,
    }),
  },
});

const resetPasswordReducer = resetPasswordSlice.reducer;

export const closeModal = () => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.closeModal());
  };
};

export const openModal = () => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.openModal());
  };
};

export const togglePassword = () => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.togglePassword());
  };
};

export const togglePasswordConfirmation = () => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.togglePasswordConfirmation());
  };
};

export const resetPassword = (data) => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.resetPassword());

    axios
      .post(`${API_URL}/account/reset-password/finish`, data)
      .then(() => {
        dispatch(resetPasswordSlice.actions.resetPasswordSuccess());
      })
      .catch((error) =>
        dispatch(resetPasswordSlice.actions.resetPasswordFail(error))
      );
  };
};

export const getResetLink = (email) => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.getResetLink());

    axios
      .post(`${API_URL}/account/reset-password/init`, email)
      .then(() => {
        dispatch(resetPasswordSlice.actions.getResetLinkSuccess());
      })
      .catch((error) =>
        dispatch(resetPasswordSlice.actions.getResetLinkFail(error))
      );
  };
};

export const checkResetToken = (token) => {
  return (dispatch) => {
    dispatch(resetPasswordSlice.actions.checkResetToken());

    axios
      .post(`${API_URL}/account/reset-password/token/is-valid`, token)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(resetPasswordSlice.actions.checkResetTokenSuccess(data));
      })
      .catch((error) =>
        dispatch(resetPasswordSlice.actions.checkResetTokenFail(error))
      );
  };
};

export default resetPasswordReducer;
