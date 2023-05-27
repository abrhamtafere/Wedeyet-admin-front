import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  tab: /* (localStorage.getItem('persist:root').tab) */null

};
export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setactive: (state, action) => {
      state.tab = action.payload
    },

  },
});
export const { setactive } =
  tabSlice.actions;
export default tabSlice.reducer;
