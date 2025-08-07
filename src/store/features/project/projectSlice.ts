import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../../types/team";

interface ProjectState {
  projects: Project[];
  currentProjectId: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProjectId: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    updateProject(
      state,
      action: PayloadAction<{ id: string; updates: Partial<Project> }>
    ) {
      const { id, updates } = action.payload;
      const project = state.projects.find((p) => p.id === id);
      if (project) {
        Object.assign(project, updates);
      }
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      // Optionally clear currentProjectId if it was deleted
      if (state.currentProjectId === action.payload) {
        state.currentProjectId = null;
      }
    },
    setCurrentProject(state, action: PayloadAction<string | null>) {
      state.currentProjectId = action.payload;
    },
  },
});

export const {
  createProject,
  updateProject,
  deleteProject,
  setCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;
