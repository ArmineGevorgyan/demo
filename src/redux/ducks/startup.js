import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  isLoading: false,
  startups: null,
  singleStartup: null,
  faqList: null,
  error: null,
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
    getStartupTeamMembers: state => ({
      ...state,
      isLoading: true
    }),
    getStartupTeamMembersSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      currentStartupTeamMembers: action.payload
    }),
    getStartupTeamMembersFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload
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
  },
});

const startupReducer = startupSlice.reducer;

export const toggleIsEmpty = () => {
  return (dispatch) => dispatch(startupSlice.actions.toggleIsEmpty());
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

export const getStartupFaqList = (id) => {
  return (dispatch) => {
    dispatch(startupSlice.actions.getStartupFaqList());

    axios
      .get(`${API_URL}/startups/${id}/info-session`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(startupSlice.actions.getStartupFaqListSuccess(data));
      })
      .catch((error) => {
        dispatch(startupSlice.actions.getStartupFaqListFail(error));
      });
  };
};

export const getStartupTeamMembers = id => dispatch => {
  dispatch(startupSlice.actions.getStartupTeamMembers());

  axios.get(`${API_URL}/startups/${id}/team-members`)
    .then(res => res.data)
    .then(data => {
      dispatch(startupSlice.actions.getStartupTeamMembersSuccess(data));
    })
    .catch(error => {
      dispatch(startupSlice.actions.getStartupTeamMembersFail(error))
    })
}
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
