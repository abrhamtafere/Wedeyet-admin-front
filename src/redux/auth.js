import { createSlice } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";

const initialState = {
  user: localStorage,

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    }, 
  },
});

export const { setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
