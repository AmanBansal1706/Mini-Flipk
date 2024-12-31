import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actions: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addAction(state, action) {
      state.actions.push(action.payload);
    },
    clearHistory(state) {
      state.actions = [];
    },
  },
});

export const { addAction, clearHistory } = historySlice.actions;
export default historySlice.reducer;
