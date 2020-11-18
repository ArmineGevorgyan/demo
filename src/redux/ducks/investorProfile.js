import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  photoError: false,
  profileData: {
  },
};

const investorProfileSlice = createSlice({
  name: "investorProfile",
  initialState,
  reducers: {
    save: (state) => ({
      ...state,
    }),
    togglePhotoError: (state, action) => ({
      ...state,
      photoError: action.payload,
    }),
    setLocation: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        locations: [
          action.payload,
        ],
      },
    }),
    setTextInput: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        ...action.payload,
      }
    }),
    getProfileData: (state) => ({
      ...state,
      isLoading: true,
    }),
    getProfileDataSuccess: (state, action) => ({
      ...state,
      isLoading: true,
      profileData: action.payload,
    }),
    getProfileDataFail: (state, action) => ({
      ...state,
      isLoading: true,
      error: action.payload,
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
      error: action.payload,
    }),
  },
});

const initialPrifileData = {
  id: null,
  photoUrl: null,
  bio: null,
  availableVia: null,
  highlights: null,
  residency: null,
  locations: null,
  timeZone: null,
  completed: null,
};

const investorProfileReducer = investorProfileSlice.reducer;

export const save = () => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.save());
  };
};

export const getProfileData = (id = -1) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.getProfileData());
    const current = id === -1 ? "current" : id;
    axios.
      get(`${API_URL}/investor-profiles/${current}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(investorProfileSlice.actions.getProfileDataSuccess(data));
      }).catch((error) => {
        dispatch(investorProfileSlice.actions.getProfileDataFail(error));
      });
  };
};

export const updateProfile = () => {
  const state = store.getState();

  return (dispatch) => {
    dispatch(investorProfileSlice.actions.updateProfile());

    axios
      .put(`${API_URL}/investor-profiles/current`, state.investorProfile.profileData)
      .then((r) => { return r.data })
      .then((data) => {
        dispatch(investorProfileSlice.actions.updateProfileSuccess(data))
      })
      .catch((error) => {
        dispatch(investorProfileSlice.actions.updateProfileFail(error));
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
      .then((r) => { return r.data })
      .then((data) => {
        dispatch(investorProfileSlice.actions.resetProfileSuccess(data))
      })
      .catch((error) => {
        dispatch(investorProfileSlice.actions.updateProfileFail(error));
      });
  };
};

export const setTextInput = (object) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.setTextInput(object));
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

const getCityObject = (input) => {
  if (typeof input === "string") {
    return {
      cityName: input,
      city: null,
      country: null,
      region: null,
    }
  } else {
    return {
      cityName: input.name,
      city: {
        id: input.id,
        name: input.name,
        countryId: input.countryId,
        regionId: input.regionId,
        country: input.country,
        region: input.region
      },
      country: input.country,
      region: input.region,
    }
  }
};

export const setLocation = (location) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.setLocation(getCityObject(location)));
  };
};

export const setTimeZone = (timeZone) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.setTimeZone(timeZone));
  };
};

export const setResidency = (residency) => {
  return (dispatch) => {
    dispatch(investorProfileSlice.actions.setResidency(getCityObject(residency)));
  }
};

export default investorProfileReducer;
