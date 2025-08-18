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
    const res = await api.put(`/teams/${teamId}`, data);

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
};

export default teamService;
