import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
};

const requestInviteSlice = createSlice({
  name: "requestInvite",
  initialState,
  reducers: {
    requestInvite: (state) => ({
      ...state,
      isLoading: true,
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
    }),
  },
});

export const requestInvite = (data) => {
  return (dispatch) => {
    dispatch(requestInviteSlice.actions.requestInvite());

    axios
      .post(`${API_URL}/invitation-requests`, data)
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
