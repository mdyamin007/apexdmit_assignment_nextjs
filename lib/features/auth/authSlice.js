import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        access_token: null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.access_token = action.payload.access_token

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("access_token", action.payload.access_token);
        },
        logOut: (state) => {
            state.user = null
            state.access_token = null
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
        },
        initAuth: (state, action) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
        }
    }
})

export const { setCredentials, logOut, initAuth } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.access_token