import { createSlice /*type PayloadAction */ } from "@reduxjs/toolkit";
import type { Team } from "../../../types/team";
import {
  fetchAllTeams,
  createTeam,
  deleteTeam,
  updateTeam,
  addProjectToTeam,
} from "./teamThunks";

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
    // addProjectToTeam(
    //   state,
    //   action: PayloadAction<{ teamId: string; projectId: string }>
    // ) {
    //   const team = state.teams.find(
    //     (team) => team.id === action.payload.teamId
    //   );
    //   if (team) {
    //     team.projectIds.push(action.payload.projectId);
    //   }
    // },
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
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        const filteredTeams = state.teams.filter(
          (team) => team.id !== action.payload
        );
        state.teams = filteredTeams;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.map((team) =>
          team.id === action.payload.id ? action.payload : team
        );
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProjectToTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProjectToTeam.fulfilled, (state, action) => {
        const updatedTeam = action.payload;

        const teamIndex = state.teams.findIndex(
          (team) => team.id === updatedTeam.id
        );

        if (teamIndex !== -1) {
          state.teams[teamIndex] = updatedTeam;
        }
      })
      .addCase(addProjectToTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { addProjectToTeam } = teamSlice.actions;

export default teamSlice.reducer;
