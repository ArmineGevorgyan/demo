import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";
import { updateUserData } from "../ducks/user";
import { showNotification } from "../../helpers/notificationHelper";

const initialState = {
  isLoading: false,
  isModalOpen: false,
  isResetting: false,
  photoError: false,
  profileData: null,
};

const entrepreneurProfileSlice = createSlice({
  name: "entrepreneurProfile",
  initialState,
  reducers: {
    openModal: (state) => ({
      ...state,
      isModalOpen: true,
    }),
    closeModal: (state) => ({
      ...state,
      isModalOpen: false,
    }),
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
    setTimeZone: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        timeZone: action.payload,
      },
    }),
    setResidency: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        residency: action.payload,
      },
    }),
    setTextInput: (state, action) => ({
      ...state,
      profileData: {
        ...state.profileData,
        ...action.payload,
      },
    }),
    getProfileData: (state) => ({
      ...state,
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
    updateProfileSuccess: (state) => ({
      ...state,
      isLoading: false,
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

const entrepreneurProfileReducer = entrepreneurProfileSlice.reducer;

export const getProfileData = (id = "current") => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.getProfileData());
    axios
      .get(`${API_URL}/entrepreneur-profiles/${id}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(entrepreneurProfileSlice.actions.getProfileDataSuccess(data));
      })
      .catch((error) => {
        dispatch(entrepreneurProfileSlice.actions.getProfileDataFail(error));
      });
  };
};

export const updateProfile = (save = false) => {
  const profileData = store.getState().entrepreneurProfile.profileData;

  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.updateProfile());

    axios
      .put(`${API_URL}/entrepreneur-profiles/current`, profileData)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(entrepreneurProfileSlice.actions.updateProfileSuccess(data));
        dispatch(getProfileData(profileData.id));
        if (save) {
          showNotification("success", "notification.saved");
        }
      })
      .catch((error) => {
        dispatch(entrepreneurProfileSlice.actions.updateProfileFail(error));
        if (save) {
          showNotification("error", "notification.somethingWentWrong");
        }
      });
  };
};

export const resetProfile = () => {
  const state = store.getState();
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.resetProfile());

    axios
      .put(`${API_URL}/entrepreneur-profiles/current`, {
        ...initialPrifileData,
        id: state.entrepreneurProfile.profileData.id,
      })
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(entrepreneurProfileSlice.actions.resetProfileSuccess(data));
      })
      .catch((error) => {
        dispatch(entrepreneurProfileSlice.actions.updateProfileFail(error));
      });
  };
};

export const setTextInput = (object) => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.setTextInput(object));
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

export const togglePhotoError = (value) => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.togglePhotoError(value));
  };
};

const getCityObject = (input) => {
  if (typeof input === "string") {
    return {
      cityName: input,
      city: null,
      country: null,
      region: null,
    };
  } else {
    return {
      cityName: input.name,
      city: {
        id: input.id,
        name: input.name,
        countryId: input.countryId,
        regionId: input.regionId,
        country: input.country,
        region: input.region,
      },
      country: input.country,
      region: input.region,
    };
  }
};

export const setLocation = (location) => {
  return (dispatch) => {
    dispatch(
      entrepreneurProfileSlice.actions.setLocation(getCityObject(location))
    );
  };
};

export const setTimeZone = (timeZone) => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.setTimeZone(timeZone));
  };
};

export const setResidency = (residency) => {
  return (dispatch) => {
    dispatch(
      entrepreneurProfileSlice.actions.setResidency(getCityObject(residency))
    );
  };
};

export default entrepreneurProfileReducer;
