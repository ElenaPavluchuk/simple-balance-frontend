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
    updateTransInRedux: (state, action) => {
      const { id, name, amount, category, date } = action.payload;
      const editedTrans = state.value.find((trans) => trans.id === id);
      if (editedTrans) {
        editedTrans.name = name;
        editedTrans.amount = amount;
        editedTrans.category = category;
        editedTrans.date = date;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransToRedux, deleteTransFromRedux, updateTransInRedux } =
  transesSlice.actions;

export default transesSlice.reducer;
