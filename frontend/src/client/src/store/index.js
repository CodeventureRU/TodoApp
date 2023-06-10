import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import authReducer from "./features/auth/authSlice";
import env from "react-dotenv";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
   },
   devTools: env.REACT_APP_DEV,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(apiSlice.middleware),
});