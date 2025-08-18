import type { Board } from "../types/team";
import { api } from "./api";

export const boardService = {
  async createBoard(data: Board) {
    const res = await api.post("/boards", data);
    const newBoard = res.data;

    return newBoard;
  },
};
