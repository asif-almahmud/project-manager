import { Columns } from "../types/types";
import { getColumns } from "./getColumns";

export function getColumn(boardId: string, columnId: string) {
  for (let column of getColumns(boardId) as Columns) {
    if (column.id === columnId) {
      return column;
    }
  }
}
