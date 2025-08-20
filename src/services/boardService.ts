import type { Board } from "../types/team";
import { api } from "./api";

export const boardService = {
  async createBoard(data: Board) {
    const res = await api.post("/boards", data);
    const newBoard = res.data;

    return newBoard;
  },
  async deleteBoard(boardId: string) {
    await api.delete(`/boards/${boardId}`);

    return boardId;
  },

  async getAllBoards() {
    const res = await api.get("/boards");

    const data = res.data;

    return data;
  },
};
