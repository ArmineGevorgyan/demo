import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  photoUrl: null,
  isModalOpen: false,
  location: null,
  timeZone: null,
  residency: null,
};

const entrepreneurProfileSlice = createSlice({
  name: "entrepreneurProfile",
  initialState,
  reducers: {
    save: (state) => ({
      ...state,
      photoUrl: "some test value to pass the screen",
    }),
    openModal: (state) => ({
      ...state,
      isModalOpen: true,
    }),
    closeModal: (state) => ({
      ...state,
      isModalOpen: false,
    }),
    setLocation: (state, action) => ({
      ...state,
      location: action.payload,
    }),
    setTimeZone: (state, action) => ({
      ...state,
      timeZone: action.payload,
    }),
    setResidency: (state, action) => ({
      ...state,
      residency: action.payload,
    }),
    updateProfile: (state) => ({
      ...state,
      isLoading: true,
    }),
    updateProfileSuccess: (state) => ({
      ...state,
      isLoading: false,
    }),
    updateProfileFail: (state) => ({
      ...state,
      isLoading: false
    })
  },
});

const entrepreneurProfileReducer = entrepreneurProfileSlice.reducer;

export const save = () => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.save());
  };
};

export const updateProfile = (data) => {
  const state = store.getState();
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.updateProfile());

    axios
      .put(`${API_URL}/entrepreneur-profiles/${state.user.profileData.id}`, data)
      .then((r) => { return r.data })
      .then((data) => {
        dispatch(entrepreneurProfileSlice.actions.updateProfileSuccess(data))
      })
      .catch((error) => {
        dispatch(entrepreneurProfileSlice.actions.updateProfileFail(error));
      });
  };
};

export const openModal = () => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.openModal());
  };
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.closeModal());
  };
};

export const setLocation = (location) => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.setLocation(location));
  };
};

export const setTimeZone = (timeZone) => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.setTimeZone(timeZone));
  };
};

export const setResidency = (residency) => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.setResidency(residency));
  }
};

export default entrepreneurProfileReducer;
