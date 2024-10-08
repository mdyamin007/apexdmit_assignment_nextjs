import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
  })
}