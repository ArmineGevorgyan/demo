import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  request: null,
  isModalOpen: false,
};

const resendInviteSlice = createSlice({
  name: "resendInvite",
  initialState,
  reducers: {
    resendInvite: (state) => ({
      ...state,
      isLoading: true,
    }),
    resendInviteSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isModalOpen: false,
    }),
    resendInviteFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    openModal: (state) => ({
      ...state,
      isModalOpen: true,
    }),
    closeModal: (state) => ({
      ...state,
      isModalOpen: false,
      request: null,
    }),
  },
});

export const closeModal = () => {
  return (dispatch) => {
    dispatch(resendInviteSlice.actions.closeModal());
  };
};

export const openModal = () => {
  return (dispatch) => {
    dispatch(resendInviteSlice.actions.openModal());
  };
};

export const resendInvite = (email) => {
  return (dispatch) => {
    dispatch(resendInviteSlice.actions.resendInvite());

    axios
      .post(`${API_URL}/public/invitation-requests/${email}/resend`, {})
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(resendInviteSlice.actions.resendInviteSuccess(data));
      })
      .catch((error) =>
        dispatch(resendInviteSlice.actions.resendInviteFail(error))
      );
  };
};

const resendInviteReducer = resendInviteSlice.reducer;

export default resendInviteReducer;
