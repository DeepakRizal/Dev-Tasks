import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../../types/team";
import { createProject } from "./projectThunks";

interface ProjectState {
  projects: Project[];
  currentProjectId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [
    {
      id: "1",
      name: "DevForge Clone",
      emoji: "🔧",
      description: "A comprehensive development platform clone",
      owner: "xyz",
      status: "Active",
      teamId: "1", // <-- added
      boardId: "board-1", // <-- added
    },
    {
      id: "2",
      name: "Portfolio Redesign",
      emoji: "🌐",
      description: "Modern portfolio website redesign",
      owner: "xyz",
      status: "Active",
      teamId: "1",
      boardId: "board-2",
    },
    {
      id: "3",
      name: "CodeBuddy",
      emoji: "🤖",
      description: "An AI pair programming assistant",
      owner: "xyz",
      status: "Active",
      teamId: "2",
      boardId: "board-3",
    },
    {
      id: "4",
      name: "UI Toolkit",
      emoji: "🧰",
      description: "Reusable components for design systems",
      owner: "xyz",
      status: "Active",
      teamId: "2",
      boardId: "board-4",
    },
  ],

  currentProjectId: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
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
      if (state.currentProjectId === action.payload) {
        state.currentProjectId = null;
      }
    },
    setCurrentProject(state, action: PayloadAction<string | null>) {
      state.currentProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { updateProject, deleteProject, setCurrentProject } =
  projectSlice.actions;

export default projectSlice.reducer;
