import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
