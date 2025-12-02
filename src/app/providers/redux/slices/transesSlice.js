import { createSlice } from "@reduxjs/toolkit";

export const transesSlice = createSlice({
  name: "transes",
  initialState: {
    value: [],
  },
  reducers: {
    addTransToRedux: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransToRedux } = transesSlice.actions;

export default transesSlice.reducer;
