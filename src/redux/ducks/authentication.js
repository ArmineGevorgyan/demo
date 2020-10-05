import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  email: "",
  emailStatus: null,
  error: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    checkEmailStatus: (state, action) => ({
      ...state,
      email: action.payload,
      isLoading: true,
    }),
    checkEmailStatusSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      emailStatus: action.payload,
      error: null,
    }),
    checkEmailStatusFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const authReducer = authSlice.reducer;

export const checkEmailStatus = (email) => {
  return (dispatch) => {
    dispatch(authSlice.actions.checkEmailStatus(email));

    axios
      .get(`${API_URL}/public/invitation-requests/${email}/status`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(authSlice.actions.checkEmailStatusSuccess(data));
      })
      .catch((error) =>
        dispatch(authSlice.actions.checkEmailStatusFail(error))
      );
  };
};

export default authReducer;
