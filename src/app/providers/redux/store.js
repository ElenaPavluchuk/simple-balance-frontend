import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../../../shared/slices/transactionsSlice";

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
