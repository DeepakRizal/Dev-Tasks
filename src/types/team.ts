export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  status: string;
  owner: string;
  teamId: string;
  boardId: string;
  archived: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface Team {
  id: string;
  name: string;
  emoji?: string;
  inviteCode?: string;
  members: string[];
  projectIds: string[];
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  emoji: string;
  taskIds: string[]; // <- required
}

export interface Board {
  id: string;
  projectId: string;
  columnIds: string[];
}

export type ColumnKey = "todo" | "inProgress" | "completed";
