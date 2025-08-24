import type { Role } from "../types/auth";
import type { Team } from "../types/team";

export const can = {
  manageTeams: (role: Role) => role === "Admin",
  manageProjects: (role: Role) => role === "Admin" || role === "Maintainer",
  manageWorkSpaceSettings: (role: Role) => role === "Admin",
  deleteHardTasks: (role: Role) => role === "Admin",

  // Team-specific permissions
  leaveTeam: (team: Team, userId: string) => {
    // User can leave team if they are a member but not the owner
    return team.members.includes(userId) && team.owner !== userId;
  },

  deleteTeam: (team: Team, userId: string) => {
    // Only the team owner can delete the team
    return team.owner === userId;
  },

  isTeamOwner: (team: Team, userId: string) => {
    // Check if user is the team owner
    return team.owner === userId;
  },

  isTeamMember: (team: Team, userId: string) => {
    // Check if user is a team member
    return team.members.includes(userId);
  },
};
