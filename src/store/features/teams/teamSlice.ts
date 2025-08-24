import { createSlice /*type PayloadAction */ } from "@reduxjs/toolkit";
import type { Team } from "../../../types/team";
import {
  fetchAllTeams,
  createTeam,
  deleteTeam,
  updateTeam,
  addProjectToTeam,
  generateInviteCode,
  joinTeamByInviteCode,
  sendInvitation,
  leaveTeam,
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
        // Handle teams without owner field by setting first member as owner
        const teamsWithOwner = action.payload.map((team) => {
          if (!team.owner && team.members.length > 0) {
            return {
              ...team,
              owner: team.members[0], // First member is the creator
            };
          }
          return team;
        });
        state.teams = teamsWithOwner;
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
        const newTeam = action.payload;
        // Ensure owner field is set
        if (!newTeam.owner && newTeam.members.length > 0) {
          newTeam.owner = newTeam.members[0];
        }
        state.teams.push(newTeam);
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
      })
      .addCase(generateInviteCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateInviteCode.fulfilled, (state, action) => {
        state.loading = false;
        const teamIndex = state.teams.findIndex(
          (team) => team.id === action.payload.id
        );
        if (teamIndex !== -1) {
          state.teams[teamIndex] = action.payload;
        }
      })
      .addCase(generateInviteCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(joinTeamByInviteCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinTeamByInviteCode.fulfilled, (state, action) => {
        state.loading = false;
        const teamIndex = state.teams.findIndex(
          (team) => team.id === action.payload.id
        );
        if (teamIndex !== -1) {
          state.teams[teamIndex] = action.payload;
        } else {
          state.teams.push(action.payload);
        }
      })
      .addCase(joinTeamByInviteCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvitation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(leaveTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveTeam.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTeam = action.payload;

        // Update the team in the state
        const teamIndex = state.teams.findIndex(
          (team) => team.id === updatedTeam.id
        );
        if (teamIndex !== -1) {
          state.teams[teamIndex] = updatedTeam;
        }
      })
      .addCase(leaveTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { addProjectToTeam } = teamSlice.actions;

export default teamSlice.reducer;
