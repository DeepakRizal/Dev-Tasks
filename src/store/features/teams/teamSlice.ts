import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Team } from "../../../types/team";
import { fetchAllTeams } from "./teamThunks";

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    createTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
    addProjectToTeam(
      state,
      action: PayloadAction<{ teamId: string; projectId: string }>
    ) {
      const team = state.teams.find(
        (team) => team.id === action.payload.teamId
      );
      if (team) {
        team.projectIds.push(action.payload.projectId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { createTeam, addProjectToTeam } = teamSlice.actions;

export default teamSlice.reducer;
