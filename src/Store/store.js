import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import historyReducer from "./historySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    history: historyReducer,
  },
});

export default store;
