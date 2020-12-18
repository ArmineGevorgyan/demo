import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  faqList: null,
  error: null,
  isModalOpen: false,
  upcomingInfoSession: null,
  joinedInfoSession: false,
};

const infoSessionSlice = createSlice({
  name: "infoSession",
  initialState,
  reducers: {
    getStartupFaqList: (state) => ({
      ...state,
      isLoading: true,
    }),
    getStartupFaqListSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      faqList: action.payload,
    }),
    getStartupFaqListFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    joinInfoSession: (state) => ({
      ...state,
      isLoading: true,
      joinedInfoSession: false,
    }),
    joinInfoSessionSuccess: (state) => ({
      ...state,
      isLoading: false,
      joinedInfoSession: true,
    }),
    joinInfoSessionFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    getUpcomingInfoSession: (state) => ({
      ...state,
      isLoading: true,
      upcomingInfoSession: null,
    }),
    getUpcomingInfoSessionSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      upcomingInfoSession: action.payload,
    }),
    getUpcomingInfoSessionFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    openInfoSessionModal: (state) => ({
      ...state,
      isModalOpen: true,
    }),
    closeInfoSessionModal: (state) => ({
      ...state,
      isModalOpen: false,
    }),
  },
});

const infoSessionReducer = infoSessionSlice.reducer;

export const closeInfoSessionModal = () => {
  return (dispatch) => {
    dispatch(infoSessionSlice.actions.closeInfoSessionModal());
  };
};

export const openInfoSessionModal = (item) => {
  return (dispatch) => {
    dispatch(infoSessionSlice.actions.openInfoSessionModal(item));
  };
};

export const getStartupFaqList = (id) => {
  return (dispatch) => {
    dispatch(infoSessionSlice.actions.getStartupFaqList());

    axios
      .get(`${API_URL}/startups/${id}/info-session`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(infoSessionSlice.actions.getStartupFaqListSuccess(data));
      })
      .catch((error) => {
        dispatch(infoSessionSlice.actions.getStartupFaqListFail(error));
      });
  };
};

export const getUpcomingInfoSession = (id) => {
  return (dispatch) => {
    dispatch(infoSessionSlice.actions.getUpcomingInfoSession());

    axios
      .get(`${API_URL}/startups/${id}/info-session/upcoming`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(infoSessionSlice.actions.getUpcomingInfoSessionSuccess(data));
      })
      .catch((error) => {
        dispatch(infoSessionSlice.actions.getUpcomingInfoSessionFail(error));
      });
  };
};

export const joinInfoSession = (id, startupId) => {
  return (dispatch) => {
    dispatch(infoSessionSlice.actions.joinInfoSession());

    axios
      .post(`${API_URL}/info-session/${id}/join`, {})
      .then(() => {
        dispatch(infoSessionSlice.actions.joinInfoSessionSuccess());
      })
      .then(() => {
        dispatch(getUpcomingInfoSession(startupId));
        dispatch(closeInfoSessionModal());
      })
      .catch((error) => {
        dispatch(infoSessionSlice.actions.joinInfoSessionFail(error));
      });
  };
};

export default infoSessionReducer;
