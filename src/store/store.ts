import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import teamReducer from "./features/teams/teamSlice";
import projectReducer from "./features/project/projectSlice";
import boardReducer from "./features/board/boardSlice";
import taskReducer from "./features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    project: projectReducer,
    board: boardReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
