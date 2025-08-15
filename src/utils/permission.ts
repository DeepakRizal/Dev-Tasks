import type { Role } from "../types/auth";

export const can = {
  manageTeams: (role: Role) => role === "Admin",
  manageProjects: (role: Role) => role === "Admin" || role === "Maintainer",
  manageWorkSpaceSettings: (role: Role) => role === "Admin",
  deleteHardTasks: (role: Role) => role === "Admin",
};
