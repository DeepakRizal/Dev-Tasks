import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Board } from "../../../types/team";
import { boardService } from "../../../services/boardService";

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (data: Board, thunkApi) => {
    try {
      const newBoard = await boardService.createBoard(data);

      return newBoard;
    } catch (error) {
      let message = "Something went wrong!";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (projectId: string, thunkApi) => {
    try {
      const deleteId = await boardService.deleteBoard(projectId);
      return deleteId;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAllBoards = createAsyncThunk(
  "boards/getAllBoards",
  async (_, thunkApi) => {
    try {
      const boardsData = await boardService.getAllBoards();

      return boardsData;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);
