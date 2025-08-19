import type { Project } from "../types/team";
import { api } from "./api";

export const projectService = {
  async createProject(data: Omit<Project, "id">) {
    const res = await api.post("/projects", data);

    const newProject = res.data;

    return newProject;
  },
  async updateProject(data: Partial<Project>) {
    const res = await api.put(`/projects/${data.id}`, data);

    const updatedProject = res.data;

    return updatedProject;
  },
  async archiveProject(id: string, data: Partial<Project>) {
    const res = await api.put(`/projects/${id}`, data);

    const updatedProject = res.data;

    return updatedProject;
  },
  async restoreProject(id: string, data: Partial<Project>) {
    const res = await api.put(`/projects/${id}`, data);

    const updatedProject = res.data;

    return updatedProject;
  },

  async deleteProject(id: string) {
    await api.delete(`/projects/${id}`);

    return id;
  },

  async updateProjectMembers(data: Partial<Project>) {
    const res = await api.put("/projects", data);

    const updatedProject = res.data;

    return updatedProject;
  },

  async getAllProjects() {
    const res = await api.get("/projects");
    const allProjects = res.data;
    return allProjects;
  },

  async getAllProjectsOfATeam(teamId: string) {
    const resProjects = await api.get("/projects");

    const projects = resProjects.data.filter(
      (project: Project) => project.teamId === teamId
    );

    return projects;
  },
};
