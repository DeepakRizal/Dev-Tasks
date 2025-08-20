import type { Column } from "../types/team";
import { api } from "./api";

export const columnService = {
  async createColumn(data: Column) {
    const res = await api.post("/columns", data);

    const newColumn = res.data;

    return newColumn;
  },

  async deleteColumn(columnId: string) {
    await api.delete(`/columns/${columnId}`);

    return columnId;
  },
};
