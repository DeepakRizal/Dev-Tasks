import type { Team } from "../types/team";
import { api } from "./api";

const teamService = {
  async getAllTeams() {
    const res = await api.get("/teams");

    const data = res.data as Team[];

    return data;
  },

  async createTeam(team: Omit<Team, "id">) {
    const res = await api.post("/teams", team);

    const data = res.data;

    return data;
  },

  async deleteTeam(teamId: string) {
    await api.delete(`/teams/${teamId}`);

    return teamId;
  },

  async updateTeam(data: Partial<Team>, teamId: string) {
    const res = await api.patch(`/teams/${teamId}`, data);

    const updatedData = res.data;

    return updatedData;
  },
  async addProjectToTeam(teamId: string, projectId: string) {
    //get the team first
    const res = await api.get(`/teams/${teamId}`);
    const team = res.data as Team;

    //update its projectIds array
    const updatedTeam = {
      ...team,
      projectIds: [...team.projectIds, projectId],
    };

    //save changes
    const updateRes = await api.put(`/teams/${teamId}`, updatedTeam);

    return updateRes.data as Team;
  },

  async generateInviteCode(teamId: string, data: { inviteCode: string }) {
    const res = await api.patch(`/teams/${teamId}`, data);
    const updatedTeam = res.data;
    return updatedTeam;
  },

  async joinTeamByInviteCode(inviteCode: string, userId: string) {
    // First, find the team with this invite code
    const teamsRes = await api.get(`/teams?inviteCode=${inviteCode}`);
    const teams = teamsRes.data as Team[];

    if (teams.length === 0) {
      throw new Error("Invalid invite code");
    }

    const team = teams[0];

    // Check if user is already a member
    if (team.members.includes(userId)) {
      throw new Error("You are already a member of this team");
    }

    // Add user to team members
    const updatedMembers = [...team.members, userId];

    const res = await api.patch(`/teams/${team.id}`, {
      members: updatedMembers,
    });
    const updatedTeam = res.data;
    return updatedTeam;
  },

  async sendInvitation(teamId: string, email: string, inviterName: string) {
    // Get team details first
    const teamRes = await api.get(`/teams/${teamId}`);
    const team = teamRes.data as Team;

    // In a real app, this would send an actual email
    // For now, we'll just simulate the API call and show success
    console.log(
      `Invitation sent to ${email} for team "${team.name}" by ${inviterName}`
    );
    console.log(`Invite code: ${team.inviteCode}`);

    return {
      email,
      teamName: team.name,
      inviteCode: team.inviteCode,
    };
  },
};

export default teamService;
