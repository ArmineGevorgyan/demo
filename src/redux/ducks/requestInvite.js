import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  request: null,
  isModalOpen: false,
};

const requestInviteSlice = createSlice({
  name: "requestInvite",
  initialState,
  reducers: {
    requestInvite: (state) => ({
      ...state,
      isLoading: true,
      request: null,
    }),
    requestInviteSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      request: action.payload,
    }),
    requestInviteFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      isModalOpen: false,
      request: null,
    }),
  },
});

export const requestInvite = (data) => {
  return (dispatch) => {
    dispatch(requestInviteSlice.actions.requestInvite());

    axios
      .post(`${API_URL}/public/invitation-requests`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(requestInviteSlice.actions.requestInviteSuccess(data));
      })
      .catch((error) =>
        dispatch(requestInviteSlice.actions.requestInviteFail(error))
      );
  };
};

const requestInviteReducer = requestInviteSlice.reducer;

export default requestInviteReducer;
