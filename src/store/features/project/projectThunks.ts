import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "../../../types/team";
import { projectService } from "../../../services/projectService";

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data: Project, thunkApi) => {
    try {
      const newProject = await projectService.createProject(data);

      return newProject;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const archiveProject = createAsyncThunk(
  "projects/archiveProject",
  async (data: Partial<Project>, thunkApi) => {
    try {
      const updatedProject = await projectService.archiveProject(data);
      return updatedProject;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const restoreProject = createAsyncThunk(
  "projects/restoreProject",
  async (data: Partial<Project>, thunkApi) => {
    try {
      const updatedProject = await projectService.restoreProject(data);
      return updatedProject;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, thunkApi) => {
    try {
      const deletedId = await projectService.deleteProject(id);
      return deletedId;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateProjectMembers = createAsyncThunk(
  "projects/updateTeam",
  async (data: Partial<Project>, thunkApi) => {
    try {
      const updatedProject = await projectService.updateProjectMembers(data);

      return updatedProject;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);
