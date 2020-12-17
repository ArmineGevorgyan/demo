import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";
import { showNotification } from "../../helpers/notificationHelper";

const initialState = {
  isLoading: false,
  photoError: false,
  profileData: {},
};

const investorProfileSlice = createSlice({
  name: "investorProfile",
  initialState,
  reducers: {
    togglePhotoError: (state, action) => ({
      ...state,
      photoError: action.payload,
    }),
    setLocation: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        locations: [action.payload],
      },
    }),
    handleInput: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        ...action.payload,
      },
    }),
    getProfileData: (state) => ({
      ...state,
      profileData: null,
      isLoading: true,
    }),
    getProfileDataSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      profileData: action.payload,
    }),
    getProfileDataFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    updateProfile: (state) => ({
      ...state,
      isLoading: true,
    }),
    updateProfileSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      profileData: action.payload,
    }),
    updateProfileFail: (state) => ({
      ...state,
      isLoading: false,
    }),
    resetProfile: (state) => ({
      ...state,
      isLoading: true,
      isResetting: true,
    }),
    resetProfileSuccess: (state, action) => ({
      ...state,
      profileData: action.payload,
      isResetting: false,
    }),
    resetProfileFail: (state, action) => ({
      ...state,
      isResetting: false,
      isLoading: false,
      error: action.payload,
    }),
  },
});

const investorProfileReducer = investorProfileSlice.reducer;

export const getProfileData = (id = "current") => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.getProfileData());
    axios
      .get(`${API_URL}/investor-profiles/${id}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(investorProfileSlice.actions.getProfileDataSuccess(data));
      })
      .catch((error) => {
        dispatch(investorProfileSlice.actions.getProfileDataFail(error));
      });
  };
};

export const updateProfile = (profileData) => {
  const state = store.getState();

  return (dispatch) => {
    dispatch(investorProfileSlice.actions.updateProfile());

    axios
      .put(`${API_URL}/investor-profiles/current`, {
        ...state.investorProfile.profileData,
        ...profileData,
      })
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(investorProfileSlice.actions.updateProfileSuccess(data));
        showNotification("success", "notification.saved");
      })
      .catch((error) => {
        dispatch(investorProfileSlice.actions.updateProfileFail(error));
        showNotification("error", "notification.somethingWentWrong");
      });
  };
};

export const resetProfile = () => {
  const state = store.getState();
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.resetProfile());

    axios
      .put(`${API_URL}/investor-profiles/current`, {
        ...initialPrifileData,
        id: state.investorProfile.profileData.id,
      })
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(investorProfileSlice.actions.resetProfileSuccess(data));
      })
      .catch((error) => {
        dispatch(investorProfileSlice.actions.updateProfileFail(error));
      });
  };
};

export const handleInput = (object) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.handleInput(object));
  };
};

export const openModal = () => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.openModal());
  };
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.closeModal());
  };
};

export const togglePhotoError = (value) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.togglePhotoError(value));
  };
};

export default investorProfileReducer;
