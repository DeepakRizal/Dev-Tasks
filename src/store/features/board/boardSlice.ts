import { createSlice } from "@reduxjs/toolkit";
import type { Board } from "../../../types/team";

interface BoardState {
  boards: Board[];
  currentBoardId: string | null;
}

const initialState: BoardState = {
  boards: [
    {
      id: "board-1",
      projectId: "1",
      columnIds: ["todo-1", "inProgress-1", "completed-1"],
    },
    {
      id: "board-2",
      projectId: "2",
      columnIds: ["todo-2", "inProgress-2", "completed-2"],
    },
    {
      id: "board-3",
      projectId: "3",
      columnIds: ["todo-3", "inProgress-3", "completed-3"],
    },
    {
      id: "board-4",
      projectId: "4",
      columnIds: ["todo-4", "inProgress-4", "completed-4"],
    },
  ],
  currentBoardId: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
