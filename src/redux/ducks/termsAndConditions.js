import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

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
  return (dispatch) => {
    dispatch(tcSlice.actions.acceptTermsAndConditions());

    axios
      .post(`${API_URL}/tc/accept`, data)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(tcSlice.actions.acceptTermsAndConditionsSuccess(data));
      })
      .catch((error) =>
        dispatch(tcSlice.actions.acceptTermsAndConditionsFail(error))
      );
  };
};

export default tcReducer;
