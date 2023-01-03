import { createSlice } from "@reduxjs/toolkit";

 const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isloader: false,
  },
  reducers: {
    ShowLoader: (state) => {
      state.isloader = true;
    },
    HideLoader: (state) => {
      state.isloader = false;
    },
  },
});

export const { ShowLoader, HideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
