import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/types";
import { authApi } from "./authApi";

interface AuthState {
    user: User | null;
    token: string | null; // Added to fix TS2339
    isInitialized: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null, // Initialized as null
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Updated to accept an optional token
        setCredentials: (state, action: PayloadAction<{ user: User; token?: string }>) => {
            state.user = action.payload.user;
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null; // Clear token on logout
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.getMe.matchFulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.isInitialized = true;
                    // Note: Usually getMe doesn't return a new token,
                    // so we keep the existing state.token
                }
            )
            .addMatcher(
                authApi.endpoints.getMe.matchRejected,
                (state) => {
                    state.user = null;
                    state.token = null; // Clear if fetch fails
                    state.isInitialized = true;
                }
            );
    },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;