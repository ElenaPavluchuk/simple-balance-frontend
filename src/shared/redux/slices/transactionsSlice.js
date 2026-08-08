import { createSlice } from "@reduxjs/toolkit";
import { sortTransactions } from "../../utils/sort";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    value: [],
  },
  reducers: {
    setTransactions: (state, action) => {
      const merged = [...state.value, ...action.payload];
      state.value = [...new Map(merged.map((t) => [t.id, t])).values()]; // deduplication
    },

    addTransactionToRedux: (state, action) => {
      state.value.push(action.payload);

      sortTransactions(state.value);
    },

    deleteTransactionFromRedux: (state, action) => {
      state.value = state.value.filter((t) => t.id !== action.payload);
    },

    updateTransactionInRedux: (state, action) => {
      const updated = action.payload;
      const transaction = state.value.find((t) => t.id === updated.id);
      if (transaction) {
        Object.assign(transaction, updated);

        sortTransactions(state.value);
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
