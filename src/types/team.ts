export interface Project {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  emoji?: string;
  projects: Project[];
  members: string[];
}
