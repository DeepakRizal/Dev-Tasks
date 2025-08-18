import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "../../../types/team";
import { createBoard } from "./boardThunks";

interface BoardState {
  boards: Board[];
  currentBoardId: string | null;
  loading: boolean;
  error: string | null;
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
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoard(
      state,
      action: PayloadAction<{ id: string; updates: Partial<Board> }>
    ) {
      const { id, updates } = action.payload;
      const board = state.boards.find((b) => b.id === id);
      if (board) {
        Object.assign(board, updates);
      }
    },
    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
      if (state.currentBoardId === action.payload) {
        state.currentBoardId = null;
      }
    },
    setCurrentBoard(state, action: PayloadAction<string | null>) {
      state.currentBoardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      });
  },
});

export const { updateBoard, deleteBoard, setCurrentBoard } = boardSlice.actions;

export default boardSlice.reducer;
