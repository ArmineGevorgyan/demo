import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { login } from "../ducks/authentication";
import store from "../store";

const initialState = {
  isLoading: false,
};

const tcSlice = createSlice({
  name: "tc",
  initialState,
  reducers: {
    acceptTermsAndConditions: (state) => ({ ...state, isLoading: true }),
    acceptTermsAndConditionsSuccess: (state) => ({
      ...state,
      isLoading: false,
      error: null,
    }),
    acceptTermsAndConditionsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const tcReducer = tcSlice.reducer;

export const acceptTermsAndConditions = (data) => {
  const state = store.getState();
  return (dispatch) => {
    dispatch(tcSlice.actions.acceptTermsAndConditions());
    const {
      email,
      invitationToken
    } = data;

    axios
      .post(`${API_URL}/tc/accept`, { email, invitationToken })
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(tcSlice.actions.acceptTermsAndConditionsSuccess(data));
        dispatch(login({
          email,
          password: state.registration.password,
        }))
      })
      .catch((error) =>
        dispatch(tcSlice.actions.acceptTermsAndConditionsFail(error))
      );
  };
};

export default tcReducer;
