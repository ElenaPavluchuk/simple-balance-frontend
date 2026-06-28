import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../../../shared/redux/slices/transactionsSlice";

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
