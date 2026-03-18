import { configureStore } from "@reduxjs/toolkit";
// import transesReducer from "./slices/transesSlice";
import transactionsReducer from "../../../shared/slices/transactionsSlice";

export default configureStore({
  reducer: {
    // transes: transesReducer,
    transes: transactionsReducer,
  },
});
