import type { Team } from "../types/team";
import { api } from "./api";

const teamService = {
  async getAllTeams() {
    const res = await api.get("/teams");

    const data = res.data as Team[];

    return data;
  },
};

export default teamService;
