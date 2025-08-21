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

export const addProjectToTeam = createAsyncThunk(
  "teams/addProjectToTeam",
  async (data: { teamId: string; projectId: string }, thunkApi) => {
    try {
      const updatedTeam = await teamService.addProjectToTeam(
        data.teamId,
        data.projectId
      );

      return updatedTeam;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        error.message = message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const generateInviteCode = createAsyncThunk(
  "team/generateInviteCode",
  async (teamId: string, thunkApi) => {
    try {
      // Generate a random invite code
      const inviteCode = `${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}-${Date.now().toString().slice(-4)}`;

      const updatedTeam = await teamService.generateInviteCode(teamId, {
        inviteCode,
      });
      return updatedTeam;
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

export const joinTeamByInviteCode = createAsyncThunk(
  "team/joinTeamByInviteCode",
  async (
    { inviteCode, userId }: { inviteCode: string; userId: string },
    thunkApi
  ) => {
    try {
      const updatedTeam = await teamService.joinTeamByInviteCode(
        inviteCode,
        userId
      );
      return updatedTeam;
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

export const sendInvitation = createAsyncThunk(
  "team/sendInvitation",
  async (
    {
      teamId,
      email,
      inviterName,
    }: { teamId: string; email: string; inviterName: string },
    thunkApi
  ) => {
    try {
      const result = await teamService.sendInvitation(
        teamId,
        email,
        inviterName
      );
      return result;
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
