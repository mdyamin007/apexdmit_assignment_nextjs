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
        },
        logOut: (state) => {
            state.user = null
            state.access_token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.access_token