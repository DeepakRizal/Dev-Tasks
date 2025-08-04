import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project, Team } from "../../../types/team";

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: [
    {
      id: "1",
      name: "Dev Warriors",
      emoji: "🧑‍💻",
      members: ["123"], // user id
      projects: [],
    },
    {
      id: "2",
      name: "Code Crafters",
      emoji: "🧑‍💻",
      members: ["123"],
      projects: [],
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
      action: PayloadAction<{ teamId: string; project: Project }>
    ) {
      const team = state.teams.find(
        (team) => team.id === action.payload.teamId
      );
      if (team) {
        team.projects.push(action.payload.project);
      }
    },
  },
});

export const { createTeam, addProjectToTeam } = teamSlice.actions;

export default teamSlice.reducer;
