import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: null

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
