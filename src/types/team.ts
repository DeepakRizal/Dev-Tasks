export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  status: string;
  owner: string;
}
interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
}
export interface Column {
  id: "todo" | "inProgress" | "completed";
  title: string;
  emoji: string;
  tasks: Task[];
}
export interface Team {
  id: string;
  name: string;
  emoji?: string;
  projects: Project[];
  members: string[];
}

export interface Column {
  id: "todo" | "inProgress" | "completed";
  title: string;
  emoji: string;
  tasks: Task[];
}

export interface Board {
  todo: Column;
  inProgress: Column;
  completed: Column;
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  board: Board;
}
