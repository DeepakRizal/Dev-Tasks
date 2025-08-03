import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../../types/auth";

interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: {
    id: "123",
    name: "xyz",
    email: "xyz@gmail.com",
    role: "admin",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: { payload: User }) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
