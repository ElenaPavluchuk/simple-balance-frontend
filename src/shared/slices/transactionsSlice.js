import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    value: [],
  },
  reducers: {
    setTransactions: (state, action) => {
      state.value = action.payload;
    },

    addTransactionToRedux: (state, action) => {
      state.value.push(action.payload);
      state.value.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    deleteTransactionFromRedux: (state, action) => {
      state.value = state.value.filter((t) => t.id !== action.payload);
    },

    updateTransactionInRedux: (state, action) => {
      const updated = action.payload;

      const transaction = state.value.find((t) => t.id === updated.id);

      if (transaction) {
        Object.assign(transaction, updated);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTransactions,
  addTransactionToRedux,
  deleteTransactionFromRedux,
  updateTransactionInRedux,
} = transactionsSlice.actions;

export const selectTransactions = (state) => state.transactions.value;

export default transactionsSlice.reducer;
