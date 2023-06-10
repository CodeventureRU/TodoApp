import {createSlice} from "@reduxjs/toolkit";
import {
    getLocalStorage,
    getObjectLocalStorage,
    setLocalStorage,
    setObjectLocalStorage
} from "../../../utlis/localStorage";


const initialState = {
    user: getObjectLocalStorage("user"),
    accessToken: getLocalStorage("accessToken"),
    refreshToken: getLocalStorage("refreshToken"),
};


const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
       setToken: (state, action) => {
           state.accessToken = action.payload.access;
           state.refreshToken = action.payload.refresh;

           setLocalStorage("accessToken", action.payload.access);
           setLocalStorage("refreshToken", action.payload.refresh);
       },

       setUser: (state, action) => {
           state.user = action.payload;

           setObjectLocalStorage("user", action.payload);
       },
       logout: (state, _) => {
           state.user = null;
           state.accessToken = null;
           state.refreshToken = null;

           setObjectLocalStorage("user", null);
           setLocalStorage("accessToken", "");
           setLocalStorage("refreshToken", "");
       }
   }
});

export const {setUser, setToken, logout} = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;