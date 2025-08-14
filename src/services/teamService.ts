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
};

export default teamService;
