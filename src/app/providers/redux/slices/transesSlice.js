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
    deleteTransFromRedux: (state, action) => {
      state.value = state.value.filter((trans) => trans.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransToRedux, deleteTransFromRedux } = transesSlice.actions;

export default transesSlice.reducer;
