import { createSlice } from "@reduxjs/toolkit";
import type { Column, Task } from "../../../types/team";

interface TaskState {
  tasks: Task[];
  columns: Column[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Design login screen",
      description: "Create wireframes and mockups for the login interface",
      columnId: "todo-1",
    },
    {
      id: "2",
      title: "Create wireframes",
      description: "Design system wireframes for all main components",
      columnId: "todo-1",
    },
    {
      id: "3",
      title: "API integration",
      description:
        "Integrate REST APIs for user authentication and project management",
      columnId: "inProgress-1",
    },
    {
      id: "4",
      title: "Fix auth bug",
      description: "Resolve authentication token refresh issue",
      columnId: "inProgress-1",
    },
    {
      id: "5",
      title: "Landing page deployed",
      description: "Successfully deployed the main landing page",
      columnId: "completed-1",
    },
    {
      id: "6",
      title: "Setup repo & CI/CD",
      description: "Configured GitHub repository with automated deployment",
      columnId: "completed-1",
    },
    // ...tasks 7–24 mapped similarly to their columnIds
  ],
  columns: [
    {
      id: "todo-1",
      boardId: "board-1",
      title: "To Do",
      emoji: "📝",
      taskIds: ["1", "2"],
    },
    {
      id: "inProgress-1",
      boardId: "board-1",
      title: "In Progress",
      emoji: "🔄",
      taskIds: ["3", "4"],
    },
    {
      id: "completed-1",
      boardId: "board-1",
      title: "Completed",
      emoji: "✅",
      taskIds: ["5", "6"],
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
