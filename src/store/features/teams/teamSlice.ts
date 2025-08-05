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
    members: ["123"],
    projects: [
      {
        id: "1",
        name: "DevForge Clone",
        emoji: "🔧",
        description: "A comprehensive development platform clone",
      },
      {
        id: "2",
        name: "Portfolio Redesign",
        emoji: "🌐",
        description: "Modern portfolio website redesign",
      },
    ],
  },
  {
    id: "2",
    name: "Code Crafters",
    emoji: "🧑‍💻",
    members: ["123"],
    projects: [
      {
        id: "3",
        name: "CodeBuddy",
        emoji: "🤖",
        description: "An AI pair programming assistant",
      },
      {
        id: "4",
        name: "UI Toolkit",
        emoji: "🧰",
        description: "Reusable components for design systems",
      },
    ],
  },
]

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
