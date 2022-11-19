import { useAppSelector } from "../app/hooks";
import { IBoard } from "../types/types";

type Id = string;

export const useGetBoardById = (id: Id) => {
  const boards = useAppSelector((state) => state.boards);
  const getBoard = () => {
    for (let board of boards) {
      if (board.id === id) {
        return board;
      }
    }
  };

  return getBoard() as IBoard;
};
