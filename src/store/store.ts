import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import teamReducer from "./features/teams/teamSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
