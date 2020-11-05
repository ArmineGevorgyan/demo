import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  photoUrl: null,
};

const entrepreneurProfileSlice = createSlice({
  name: "entrepreneurProfile",
  initialState,
  reducers: {
    save: (state) => ({
      ...state,
      photoUrl: "some test value to pass the screen",
    })
  },
});

const entrepreneurProfileReducer = entrepreneurProfileSlice.reducer;

export const save = () => {
  return (dispatch) => {
    dispatch(entrepreneurProfileSlice.actions.save());
  };
};

export default entrepreneurProfileReducer;
