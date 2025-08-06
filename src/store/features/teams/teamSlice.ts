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
          owner: "xyz",
          status: "Active",
          board: {
            todo: {
              id: "todo",
              title: "To Do",
              emoji: "📝",
              tasks: [
                {
                  id: "1",
                  title: "Design login screen",
                  description:
                    "Create wireframes and mockups for the login interface",
                },
                {
                  id: "2",
                  title: "Create wireframes",
                  description:
                    "Design system wireframes for all main components",
                },
              ],
            },
            inProgress: {
              id: "inProgress",
              title: "In Progress",
              emoji: "🔄",
              tasks: [
                {
                  id: "3",
                  title: "API integration",
                  description:
                    "Integrate REST APIs for user authentication and project management",
                },
                {
                  id: "4",
                  title: "Fix auth bug",
                  description: "Resolve authentication token refresh issue",
                },
              ],
            },
            completed: {
              id: "completed",
              title: "Completed",
              emoji: "✅",
              tasks: [
                {
                  id: "5",
                  title: "Landing page deployed",
                  description: "Successfully deployed the main landing page",
                },
                {
                  id: "6",
                  title: "Setup repo & CI/CD",
                  description:
                    "Configured GitHub repository with automated deployment",
                },
              ],
            },
          },
        },
        {
          id: "2",
          name: "Portfolio Redesign",
          emoji: "🌐",
          description: "Modern portfolio website redesign",
          owner: "xyz",
          status: "Active",
          board: {
            todo: {
              id: "todo",
              title: "To Do",
              emoji: "📝",
              tasks: [
                {
                  id: "7",
                  title: "Define color palette",
                  description: "Choose modern and accessible color themes",
                },
                {
                  id: "8",
                  title: "Sketch layout",
                  description: "Rough layout of homepage sections",
                },
              ],
            },
            inProgress: {
              id: "inProgress",
              title: "In Progress",
              emoji: "🔄",
              tasks: [
                {
                  id: "9",
                  title: "Implement navigation",
                  description: "Develop responsive nav bar and links",
                },
                {
                  id: "10",
                  title: "Add contact form",
                  description: "Build form with validation and responsiveness",
                },
              ],
            },
            completed: {
              id: "completed",
              title: "Completed",
              emoji: "✅",
              tasks: [
                {
                  id: "11",
                  title: "Setup hosting",
                  description: "Configured Netlify hosting with custom domain",
                },
                {
                  id: "12",
                  title: "Created project structure",
                  description: "Initialized React project and folders",
                },
              ],
            },
          },
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
          owner: "xyz",
          status: "Active",
          board: {
            todo: {
              id: "todo",
              title: "To Do",
              emoji: "📝",
              tasks: [
                {
                  id: "13",
                  title: "Draft AI use cases",
                  description:
                    "List down initial use cases for AI pair programming",
                },
                {
                  id: "14",
                  title: "Research GPT API",
                  description: "Understand capabilities and limitations",
                },
              ],
            },
            inProgress: {
              id: "inProgress",
              title: "In Progress",
              emoji: "🔄",
              tasks: [
                {
                  id: "15",
                  title: "Set up OpenAI SDK",
                  description: "Initialize SDK and environment keys",
                },
                {
                  id: "16",
                  title: "Start chat module",
                  description: "Build UI for assistant chat",
                },
              ],
            },
            completed: {
              id: "completed",
              title: "Completed",
              emoji: "✅",
              tasks: [
                {
                  id: "17",
                  title: "Created logo",
                  description: "Designed and exported project branding assets",
                },
                {
                  id: "18",
                  title: "Initialized repo",
                  description: "GitHub repo with README and license",
                },
              ],
            },
          },
        },
        {
          id: "4",
          name: "UI Toolkit",
          emoji: "🧰",
          description: "Reusable components for design systems",
          owner: "xyz",
          status: "Active",
          board: {
            todo: {
              id: "todo",
              title: "To Do",
              emoji: "📝",
              tasks: [
                {
                  id: "19",
                  title: "Plan component list",
                  description: "List commonly used UI components",
                },
                {
                  id: "20",
                  title: "Set up storybook",
                  description: "Prepare visual testing environment",
                },
              ],
            },
            inProgress: {
              id: "inProgress",
              title: "In Progress",
              emoji: "🔄",
              tasks: [
                {
                  id: "21",
                  title: "Build Button component",
                  description: "Create and style primary/secondary buttons",
                },
                {
                  id: "22",
                  title: "Design Input field",
                  description: "Reusable and styled input field with label",
                },
              ],
            },
            completed: {
              id: "completed",
              title: "Completed",
              emoji: "✅",
              tasks: [
                {
                  id: "23",
                  title: "Initialize UI repo",
                  description: "Created base project using Vite + TS",
                },
                {
                  id: "24",
                  title: "Setup Tailwind",
                  description: "Integrated TailwindCSS with proper configs",
                },
              ],
            },
          },
        },
      ],
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
