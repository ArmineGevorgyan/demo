import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: true,
}

const copyrightSlice = createSlice({
  name: "copyright",
  initialState,
  reducers: {
    showCopyright: (state) => ({
      ...state,
      show: true,
    }),
    hideCopyright: (state) => ({
      ...state,
      show: false,
    }),
  }
})

const copyrightReducer = copyrightSlice.reducer;

export const showCopyright = () => {
  return (dispatch) => {
    dispatch(copyrightSlice.actions.showCopyright());
  };
};

export const hideCopyright = () => {
  return (dispatch) => {
    dispatch(copyrightSlice.actions.hideCopyright());
  };
};

export default copyrightReducer;