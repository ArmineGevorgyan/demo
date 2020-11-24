import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { getToken } from "../../helpers/auth";

const initialState = {
  isLoading: false,
  file: null,
  image:null,
};

const fileUploaderSlice = createSlice({
  name: "fileUploader",
  initialState,
  reducers: {
    uploadFile: (state) => ({
      ...state,
      isLoading: true,
    }),
    uploadFileFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    downloadFile: (state) => ({
      ...state,
      isLoading: true,
    }),
    downloadFileSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      image: action.payload,
    }),
    downloadFileFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    resetImage: (state) => ({
      ...state,
      image:null,
    }),
  },
});

const fileUploaderReducer = fileUploaderSlice.reducer;

export const resetImage = () => {
  return (dispatch) => {
    dispatch(fileUploaderSlice.actions.resetImage());
  }
}

export const uploadFile = (photo) => {
  return (dispatch) => {
    dispatch(fileUploaderSlice.actions.uploadFile());

    const fileEnding = photo.uri.split(".").pop();

    const formData = new FormData();

    formData.append("file", {
      name: photo.fileName || `profile.${fileEnding}`,
      type: `${photo.type}/${fileEnding}`,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    formData.append("context", "test");

    axios
      .post(`${API_URL}/file/upload`, formData)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        dispatch(downloadFile(data.value));
      })  
      .catch((error => {
        dispatch(fileUploaderSlice.actions.uploadFileFail(error));
      }));
  };
};

export const downloadFile = (guid) => {
  const url = `${API_URL}/file/download/${guid}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((r) => {
        return r.config;
      })
      .then((config) => {
        dispatch(fileUploaderSlice.actions.downloadFileSuccess(url));
      })
      .catch((error) => {
        dispatch(fileUploaderSlice.actions.downloadFileFail(error));
      });
  };
};

export default fileUploaderReducer;