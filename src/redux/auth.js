import { createSlice } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Cookies} from 'react-cookie';
let parsedData;

const initialState = {
  user: parsedData||localStorage.getItem('persist:root'),
  token: null, 
};

// remove setted cookie
const cookies = new Cookies();    
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
      cookies.remove('token', { path: '/' });
      cookies.remove('user', { path: '/' });
      cookies.remove('role', { path: '/' });
    }, 
  },
});

export const { setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
