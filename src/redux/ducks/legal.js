import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
  document: null,
};

const legalSlice = createSlice({
  name: "legal",
  initialState,
  reducers: {
    getLegalDoc: (state) => ({
      ...state,
      isLoading: true,
    }),
    getLegalDocSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      document: action.payload,
      error: null,
    }),
    getLegalDocFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const legalReducer = legalSlice.reducer;

export const getLegalDoc = (uri) => {
  return (dispatch) => {
    dispatch(legalSlice.actions.getLegalDoc());

    axios
      .get(uri)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(legalSlice.actions.getLegalDocSuccess(data));
      })
      .catch((error) => dispatch(legalSlice.actions.getLegalDocFail(error)));
  };
};

export default legalReducer;
