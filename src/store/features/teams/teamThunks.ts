import { createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../../../services/teamService";

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
