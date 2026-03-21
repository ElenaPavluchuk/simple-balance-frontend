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
    },

    deleteTransactionFromRedux: (state, action) => {
      state.value = state.value.filter((t) => t.id !== action.payload);
    },

    updateTransactionInRedux: (state, action) => {
      const { id, name, amount, category, date } = action.payload;
      const editedTransaction = state.value.find((t) => t.id === id);
      if (editedTransaction) {
        editedTransaction.name = name;
        editedTransaction.amount = amount;
        editedTransaction.category = category;
        editedTransaction.date = date;
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
