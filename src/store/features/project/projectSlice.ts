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
    updateProject() {},
    deleteProject() {},
    setCurrentProject() {},
  },
});

export const {
  createProject,
  updateProject,
  deleteProject,
  setCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;
