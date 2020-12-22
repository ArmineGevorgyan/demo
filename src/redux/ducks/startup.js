import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  startups: null,
  singleStartup: null,
  error: null,
  founderModalItem: null,
  isModalOpen: false,
};

const startupSlice = createSlice({
  name: "startup",
  initialState,
  reducers: {
    getNewStartups: (state) => ({ ...state, isLoading: true }),
    getNewStartupsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isEmpty: false,
      startups: action.payload,
      error: null,
    }),
    getNewStartupsFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addStartupToParkingLotFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    addStartupToPipelineFail: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    toggleIsEmpty: (state) => ({
      ...state,
      isEmpty: !state.isEmpty,
    }),
    getStartupTeamMembers: (state) => ({
      ...state,
      isLoading: true,
    }),
    getStartupTeamMembersSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      currentStartupTeamMembers: action.payload,
    }),
    getStartupTeamMembersFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    getStartupById: (state) => ({
      ...state,
      isLoading: true,
      singleStartup: null,
    }),
    getStartupByIdSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      singleStartup: action.payload,
    }),
    getStartupByIdFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    openFounderModal: (state, action) => ({
      ...state,
      founderModalItem: action.payload,
      isModalOpen: true,
    }),
    closeFounderModal: (state) => ({
      ...state,
      founderModalItem: null,
      isModalOpen: false,
    }),
  },
});

const startupReducer = startupSlice.reducer;

export const toggleIsEmpty = () => {
  return (dispatch) => dispatch(startupSlice.actions.toggleIsEmpty());
};

export const closeFounderModal = () => {
  return (dispatch) => {
    dispatch(startupSlice.actions.closeFounderModal());
  };
};

export const openFounderModal = (item) => {
  return (dispatch) => {
    dispatch(startupSlice.actions.openFounderModal(item));
  };
};

export const getNewStartups = () => {
  return (dispatch) => {
    dispatch(startupSlice.actions.getNewStartups());

    axios
      .get(`${API_URL}/startups/new`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(startupSlice.actions.getNewStartupsSuccess(data));
      })
      .catch((error) =>
        dispatch(startupSlice.actions.getNewStartupsFail(error))
      );
  };
};

export const addStartupToParkingLot = (startup) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startup.id}/parking-lot`)
      .catch((error) => {
        dispatch(startupSlice.actions.addStartupToParkingLotFail(error));
      });
  };
};

export const addStartupToPipeline = (startup) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/startups/${startup.id}/interested`)
      .catch((error) => {
        dispatch(startupSlice.actions.addStartupToPipelineFail(error));
      });
  };
};

export const getStartupTeamMembers = (id) => (dispatch) => {
  dispatch(startupSlice.actions.getStartupTeamMembers());

  axios
    .get(`${API_URL}/startups/${id}/team-members`)
    .then((res) => res.data)
    .then((data) => {
      dispatch(startupSlice.actions.getStartupTeamMembersSuccess(data));
    })
    .catch((error) => {
      dispatch(startupSlice.actions.getStartupTeamMembersFail(error));
    });
};

export const getStartupById = (id) => {
  return (dispatch) => {
    dispatch(startupSlice.actions.getStartupById());

    axios
      .get(`${API_URL}/startups/${id}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(startupSlice.actions.getStartupByIdSuccess(data));
      })
      .catch((error) => {
        dispatch(startupSlice.actions.getStartupByIdFail(error));
      });
  };
};

export default startupReducer;
