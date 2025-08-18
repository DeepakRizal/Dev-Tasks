import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../../types/team";
import {
  createProject,
  deleteProject,
  getAllProjectsOfATeam,
  updateProject,
} from "./projectThunks";

interface ProjectState {
  projects: Project[];
  currentProjectId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProjectId: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // updateProject(
    //   state,
    //   action: PayloadAction<{ id: string; updates: Partial<Project> }>
    // ) {
    //   const { id, updates } = action.payload;
    //   const project = state.projects.find((p) => p.id === id);
    //   if (project) {
    //     Object.assign(project, updates);
    //   }
    // },
    // deleteProject(state, action: PayloadAction<string>) {
    //   state.projects = state.projects.filter((p) => p.id !== action.payload);
    //   if (state.currentProjectId === action.payload) {
    //     state.currentProjectId = null;
    //   }
    // },
    setCurrentProject(state, action: PayloadAction<string | null>) {
      state.currentProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProjectIndex = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (updatedProjectIndex !== -1) {
          state.projects[updatedProjectIndex] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllProjectsOfATeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectsOfATeam.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length > 0) {
          state.projects = action.payload;
        }
      })
      .addCase(getAllProjectsOfATeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
