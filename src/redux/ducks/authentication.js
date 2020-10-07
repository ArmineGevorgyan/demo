import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  email: "",
  emailStatus: null,
  token: null,
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
    login: (state) => ({
      ...state,
      isLoading: true,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      token: action.payload.token,
      error: null,
    }),
    loginFail: (state, action) => ({
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

export const login = (data) => {
  return (dispatch) => {
    dispatch(authSlice.actions.login());

    axios
      .post(`${API_URL}/authenticate`, data)
      .then((r) => r.data)
      .then((data) => dispatch(authSlice.actions.loginSuccess(data)))
      .catch((error) => dispatch(authSlice.actions.loginFail(error)));
  };
};

export default authReducer;
