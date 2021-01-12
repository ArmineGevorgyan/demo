import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { getToken } from "../../helpers/auth";

const initialState = {
  isLoading: false,
  isLoadingVideo: false,
  file: null,
  image: null,
  video: null,
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
    uploadVideo: (state) => ({
      ...state,
      isLoadingVideo: true,
    }),
    uploadVideoFail: (state) => ({
      ...state,
      isLoadingVideo: false,
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
    downloadVideo: (state) => ({
      ...state,
      isLoadingVideo: true,
    }),
    downloadVideoSuccess: (state, action) => ({
      ...state,
      isLoadingVideo: false,
      video: action.payload,
    }),
    downloadVideoFail: (state, action) => ({
      ...state,
      isLoadingVideo: false,
      error: action.payload,
    }),
    resetImage: (state) => ({
      ...state,
      image: null,
    }),
  },
});

const fileUploaderReducer = fileUploaderSlice.reducer;

export const resetImage = () => {
  return (dispatch) => {
    dispatch(fileUploaderSlice.actions.resetImage());
  };
};

export const uploadFile = (file) => {
  return (dispatch) => {
    if (file.type === "image") {
      dispatch(fileUploaderSlice.actions.uploadFile());
    } else {
      dispatch(fileUploaderSlice.actions.uploadVideo());
    }

    const fileEnding = file.uri.split(".").pop();

    const formData = new FormData();

    formData.append("file", {
      name: file.fileName || `profile.${fileEnding}`,
      type: `${file.type}/${fileEnding}`,
      uri:
        Platform.OS === "android" ? file.uri : file.uri.replace("file://", ""),
    });
    formData.append("context", "test");

    axios
      .post(`${API_URL}/file/upload`, formData)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (file.type === "image") {
          dispatch(downloadFile(data.value));
        } else {
          dispatch(downloadVideo(data.value));
        }
      })
      .catch((error) => {
        dispatch(fileUploaderSlice.actions.uploadFileFail(error));
      });
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

export const downloadVideo = (guid) => {
  const url = `${API_URL}/file/download/${guid}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((r) => {
        return r.config;
      })
      .then((config) => {
        dispatch(fileUploaderSlice.actions.downloadVideoSuccess(url));
      })
      .catch((error) => {
        dispatch(fileUploaderSlice.actions.downloadVideoFail(error));
      });
  };
};

export default fileUploaderReducer;
