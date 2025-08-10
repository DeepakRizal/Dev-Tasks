import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    addTask(state, action: PayloadAction<{ task: Task; columnId: string }>) {
      const { task, columnId } = action.payload;
      console.log(task);
      state.tasks.push(task);

      // Update the column's taskIds
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.taskIds.push(task.id);
      }
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>
    ) {
      const { id, updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);

      // Remove taskId from all columns
      state.columns.forEach((column) => {
        column.taskIds = column.taskIds.filter((id) => id !== taskId);
      });
    },
    moveTask(
      state,
      action: PayloadAction<{
        taskId: string;
        fromColumnId: string;
        toColumnId: string;
      }>
    ) {
      const { taskId, fromColumnId, toColumnId } = action.payload;

      // Update task's columnId
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.columnId = toColumnId;
      }

      // Update column taskIds
      const fromColumn = state.columns.find((col) => col.id === fromColumnId);
      const toColumn = state.columns.find((col) => col.id === toColumnId);

      if (fromColumn) {
        fromColumn.taskIds = fromColumn.taskIds.filter((id) => id !== taskId);
      }
      if (toColumn) {
        toColumn.taskIds.push(taskId);
      }
    },
    addColumn(state, action: PayloadAction<Column>) {
      state.columns.push(action.payload);
    },
    updateColumn(
      state,
      action: PayloadAction<{ id: string; updates: Partial<Column> }>
    ) {
      const { id, updates } = action.payload;
      const column = state.columns.find((col) => col.id === id);
      if (column) {
        Object.assign(column, updates);
      }
    },
    deleteColumn(state, action: PayloadAction<string>) {
      const columnId = action.payload;
      state.columns = state.columns.filter((col) => col.id !== columnId);

      // Remove tasks that belong to this column
      state.tasks = state.tasks.filter((task) => task.columnId !== columnId);
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  addColumn,
  updateColumn,
  deleteColumn,
} = taskSlice.actions;

export default taskSlice.reducer;
