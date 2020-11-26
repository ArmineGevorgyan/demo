import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { getToken, removeToken, setToken } from "../../helpers/auth";
import { showNotification } from "../../helpers/notificationHelper";
import { getUserData, clearUserData } from "./user";

const initialState = {
  isLoading: false,
  email: "",
  emailStatus: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    checkEmailStatus: (state, action) => ({
      ...state,
      email: action.payload,
      emailStatus: null,
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
    loginSuccess: (state) => ({
      ...state,
      isLoading: false,
      error: null,
      isAuthenticated: true,
    }),
    loginFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      isAuthenticated: false,
    }),
    logout: (state) => ({
      ...state,
      isLoading: true,
    }),
    logoutSuccess: (state) => ({
      ...state,
      isLoading: false,
    }),
    logoutFail: (state) => ({
      ...state,
      isLoading: false,
    }),
    authenticate: (state) => ({
      ...state,
      isAuthenticated: true,
    }),
    clearAuthentication: (state) => ({
      ...state,
      isAuthenticated: false,
    }),
  },
});

const authReducer = authSlice.reducer;

export const authenticate = () => {
  return (dispatch) => {
    getToken()
      .then((token) => {
        if (token) {
          dispatch(authSlice.actions.authenticate());
          dispatch(getUserData());
        }
      })
      .catch((error) => dispatch(clearAuthentication()));
  };
};

export const clearAuthentication = () => {
  removeToken();

  return (dispatch) => {
    dispatch(authSlice.actions.clearAuthentication());
    dispatch(clearUserData());
  };
};

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
      .then((data) => {
        const token = data.token;
        if (token) {
          setToken(token);

          dispatch(getUserData());
          dispatch(authSlice.actions.loginSuccess());
        }
      })
      .catch((error) => {
        if (error.config && error.response && error.response.status === 401) {
          showNotification("error", "notification.wrongPassword");
        }
        dispatch(authSlice.actions.loginFail(error));
      });
  };
};

export const logout = (navigation) => {
  return (dispatch) => {
    dispatch(authSlice.actions.logout());

    axios
      .post(`${API_URL}/logout`, {})
      .then(() => {
        dispatch(clearAuthentication());
        navigation.navigate("LandingScreen");
      })
      .catch((error) => {
        dispatch(authSlice.actions.loginFail(error));
      });
  };
};

export default authReducer;
