import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./features";

export const store = configureStore({
  reducer: countReducer,
});
