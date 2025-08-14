import { createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../../../services/teamService";
import type { Team } from "../../../types/team";

export const fetchAllTeams = createAsyncThunk(
  "teams/fetchAll",
  async (_, thunkApi) => {
    try {
      const teams = await teamService.getAllTeams();
      return teams;
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (data: Team, thunkApi) => {
    try {
      const team = await teamService.createTeam(data);

      return team;
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId: string, thunkApi) => {
    try {
      const id = teamService.deleteTeam(teamId);
      return id;
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async (data: Partial<Team>, thunkApi) => {
    try {
      const teamId = data.id as string;
      const updatedTeam = await teamService.updateTeam(data, teamId);

      return updatedTeam;
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);
