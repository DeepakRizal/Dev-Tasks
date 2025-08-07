import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Team } from "../../../types/team";

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: [
    {
      id: "1",
      name: "Dev Warriors",
      emoji: "🧑‍💻",
      members: ["123"],
      projectIds: ["1", "2"],
    },
    {
      id: "2",
      name: "Code Crafters",
      emoji: "🧑‍💻",
      members: ["123"],
      projectIds: ["3", "4"],
    },
  ],
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
});

export const { createTeam, addProjectToTeam } = teamSlice.actions;

export default teamSlice.reducer;
