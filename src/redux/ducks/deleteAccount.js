import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

initialState = {
  isLoading: false,
  error: null,
  deleteAccountReasons: null,
  deleteAccountModalOpen: false,
  deleteAccountSuccessOpen: false,
  deleteRequestSent: false,
};

const deleteAccountSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getDeleteAccountReasons: (state) => ({
      ...state,
      isLoading: true,
      deleteRequestSent: false,
    }),
    getDeleteAccountReasonsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      deleteAccountReasons: action.payload,
    }),
    getDeleteAccountReasonsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    deleteAccountRequest: (state) => ({
      ...state,
      isLoading: true,
      deleteRequestSent: false,
    }),
    deleteAccountRequestSuccess: (state) => ({
      ...state,
      isLoading: false,
      deleteRequestSent: true,
    }),
    deleteAccountRequestFail: (state, action) => ({
      ...state,
      isLoading: false,
      deleteRequestSent: false,
      error: action.payload,
    }),
    openDeleteAccountModal: (state) => ({
      ...state,
      deleteRequestSent: false,
      deleteAccountModalOpen: true,
    }),
    closeDeleteAccountModal: (state) => ({
      ...state,
      deleteAccountModalOpen: false,
      request: null,
    }),
    openDeleteAccountSuccess: (state) => ({
      ...state,
      deleteAccountSuccessOpen: true,
    }),
    closeDeleteAccountSuccess: (state) => ({
      ...state,
      deleteAccountSuccessOpen: false,
      request: null,
    }),
  },
});

const deleteAccountReducer = deleteAccountSlice.reducer;

export const closeDeleteAccountSuccess = () => {
  return (dispatch) => {
    dispatch(deleteAccountSlice.actions.closeDeleteAccountSuccess());
  };
};

export const openDeleteAccountSuccess = () => {
  return (dispatch) => {
    dispatch(deleteAccountSlice.actions.openDeleteAccountSuccess());
  };
};

export const closeDeleteAccountModal = () => {
  return (dispatch) => {
    dispatch(deleteAccountSlice.actions.closeDeleteAccountModal());
  };
};

export const openDeleteAccountModal = () => {
  return (dispatch) => {
    dispatch(deleteAccountSlice.actions.openDeleteAccountModal());
  };
};

export const deleteAccountRequest = (data) => {
  return (dispatch) => {
    dispatch(deleteAccountSlice.actions.deleteAccountRequest());

    axios
      .post(`${API_URL}/profile-delete-requests`, data)
      .then(() => {
        dispatch(deleteAccountSlice.actions.deleteAccountRequestSuccess());
      })
      .catch((error) => {
        dispatch(deleteAccountSlice.actions.deleteAccountRequestFail(error));
      });
  };
};

export const getDeleteAccountReasons = () => {
  return (dispatch) => {
    dispatch(deleteAccountSlice.actions.getDeleteAccountReasons());

    axios
      .get(`${API_URL}/profile-delete-request-reasons`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(
          deleteAccountSlice.actions.getDeleteAccountReasonsSuccess(data)
        );
      })
      .catch((error) => {
        dispatch(deleteAccountSlice.actions.getDeleteAccountReasonsFail(error));
      });
  };
};

export default deleteAccountReducer;
