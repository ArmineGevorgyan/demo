import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  error: null,
  faqList: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    getInvestorFAQ: (state) => ({
      ...state,
      isLoading: true,
    }),
    getInvestorFAQSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      faqList: action.payload,
    }),
    getInvestorFAQFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    getEntrepreneurFAQ: (state) => ({
      ...state,
      isLoading: true,
    }),
    getEntrepreneurFAQSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      faqList: action.payload,
    }),
    getEntrepreneurFAQFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const faqReducer = faqSlice.reducer;

export const getInvestorFAQ = () => {
  return (dispatch) => {
    dispatch(faqSlice.actions.getInvestorFAQ());

    axios
      .get(`${API_URL}/investor/faq`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(faqSlice.actions.getInvestorFAQSuccess(data));
      })
      .catch((error) => {
        dispatch(faqSlice.actions.getInvestorFAQFail(error));
      });
  };
};

export const getEntrepreneurFAQ = () => {
  return (dispatch) => {
    dispatch(faqSlice.actions.getEntrepreneurFAQ());

    axios
      .get(`${API_URL}/entrepreneur/faq`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(faqSlice.actions.getEntrepreneurFAQSuccess(data));
      })
      .catch((error) => {
        dispatch(faqSlice.actions.getEntrepreneurFAQFail(error));
      });
  };
};

export default faqReducer;
