import { configureStore } from "@reduxjs/toolkit";
import transesReducer from "./slices/transesSlice";

export default configureStore({
  reducer: {
    transes: transesReducer,
  },
});
