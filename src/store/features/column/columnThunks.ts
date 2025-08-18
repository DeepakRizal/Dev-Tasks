import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Column } from "../../../types/team";
import { columnService } from "../../../services/columnService";

export const createColumn = createAsyncThunk(
  "columns/createColumn",
  async (data: Column, thunkApi) => {
    try {
      const newColumn = await columnService.createColumn(data);

      return newColumn;
    } catch (error) {
      let message = "Something went wrong!";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      thunkApi.rejectWithValue(message);
    }
  }
);
