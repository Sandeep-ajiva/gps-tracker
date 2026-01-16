import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: any | null;
    token: string | null;
    role: "admin" | "seller" | "client" | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    role: (typeof window !== "undefined" ? localStorage.getItem("userRole") : null) as any,
    isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: any; token: string; role: UserState["role"] }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("userRole", action.payload.role || "");
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;

            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("adminToken"); // Clean up legacy tokens
            }
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
