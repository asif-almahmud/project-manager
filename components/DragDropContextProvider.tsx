import React, { ReactNode, FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  onBoardDragAndDrop,
  onCardDragAndDropInSameColumn,
  onCardDragAndDropIntoDifferentColumns,
  onColumnDragAndDrop,
} from "../features/boards/boardsSlice";
import { Boards, Cards, Columns } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getCards, getColumns } from "../utils/dataById";

const BoardsSummary = dynamic(() => import("./BoardsSummary"), { ssr: false });

interface IDragDropContextProviderProps {
  children: ReactNode;
}

export const DragDropContextProvider: FC<IDragDropContextProviderProps> = ({
  children,
}) => {
  const { route } = useRouter();
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const {
    query: { boardId: id },
  } = useRouter();
  const boardId = id as string;

  const handleDragAndDrop = (result: DropResult) => {
    const { destination, source } = result;

    let dIndex = destination?.index as number;
    let sIndex = source.index;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && dIndex === sIndex)
      return;

    //~ Drag and Drop of boards
    if (destination?.droppableId === "BoardsList") {
      let updatedBoards: Boards = [];
      let selected = boards[sIndex];
      for (let i = 0; i < boards.length; i++) {
        if (i === dIndex) {
          if (sIndex > dIndex) {
            updatedBoards.push(selected);
            updatedBoards.push(boards[i]);
          } else {
            updatedBoards.push(boards[i]);
            updatedBoards.push(selected);
          }
        } else if (i === sIndex) {
          continue;
        } else {
          updatedBoards.push(boards[i]);
        }
      }

      dispatch(onBoardDragAndDrop(updatedBoards));
    }

    //~ Drag and Drop of Columns
    if (destination?.droppableId.includes("BoardId")) {
      const columns = getColumns(boardId);
      let updatedColumns: Columns = [];
      let selected = columns[sIndex];
      for (let i = 0; i < columns.length; i++) {
        if (i === dIndex) {
          if (sIndex > dIndex) {
            updatedColumns.push(selected);
            updatedColumns.push(columns[i]);
          } else {
            updatedColumns.push(columns[i]);
            updatedColumns.push(selected);
          }
        } else if (i === sIndex) {
          continue;
        } else {
          updatedColumns.push(columns[i]);
        }
      }

      dispatch(onColumnDragAndDrop({ boardId, columns: updatedColumns }));
    }

    //~ Drag and Drop of Cards
    if (destination?.droppableId.includes("ColumnId")) {
      const dColumnId = destination.droppableId.split("-").slice(1).join("-");
      const sColumnId = source.droppableId.split("-").slice(1).join("-");
      const dCards = getCards(boardId, dColumnId);
      const sCards = getCards(boardId, sColumnId);
      console.log({ dCards, sCards });

      let updatedSourceCards: Cards = [];
      let updatedDestinationCards: Cards = [];
      let selected = sCards[sIndex];

      if (dColumnId === sColumnId) {
        for (let i = 0; i < sCards.length; i++) {
          if (i === dIndex) {
            if (sIndex > dIndex) {
              updatedSourceCards.push(selected);
              updatedSourceCards.push(sCards[i]);
            } else {
              updatedSourceCards.push(sCards[i]);
              updatedSourceCards.push(selected);
            }
          } else if (i === sIndex) {
            continue;
          } else {
            updatedSourceCards.push(sCards[i]);
          }
        }

        console.log("in the same column");
        dispatch(
          onCardDragAndDropInSameColumn({
            boardId,
            columnId: sColumnId,
            cards: updatedSourceCards,
          })
        );
      } else {
        for (let i = 0; i < sCards.length; i++) {
          if (i === sIndex) {
            continue;
          } else {
            updatedSourceCards.push(sCards[i]);
          }
        }

        if (dIndex === dCards.length) {
          updatedDestinationCards = [...dCards, selected];
        } else {
          for (let i = 0; i < dCards.length; i++) {
            if (i === dIndex) {
              updatedDestinationCards.push(selected);
              updatedDestinationCards.push(dCards[i]);
            } else {
              updatedDestinationCards.push(dCards[i]);
            }
          }
        }

        console.log("in different columns");
        console.log({ updatedSourceCards, updatedDestinationCards });

        dispatch(
          onCardDragAndDropIntoDifferentColumns({
            boardId,
            sColumnId: sColumnId,
            dColumnId: dColumnId,
            sCards: updatedSourceCards,
            dCards: updatedDestinationCards,
          })
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="min-h-screen bg-gray-800 text-gray-50 flex flex-col items-center md:flex-row-reverse ">
        <div
          className={`w-full ${
            route === "/boards" ? "w-3/4 sm:w-1/2 mx-auto" : "md:w-3/4 lg:w-4/5"
          } `}
        >
          {children}
        </div>

        {route !== "/boards" && (
          <div
            className={`${
              boardId ? "hidden md:block" : ""
            } w-4/5 sm:w-3/5 md:w-1/4 lg:w-1/5 md:block md:border-r-[1px] border-r-gray-500 md:overflow-y-auto md:overflow-x-hidden`}
          >
            <BoardsSummary />
          </div>
        )}
      </div>
    </DragDropContext>
  );
};
