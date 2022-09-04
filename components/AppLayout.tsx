import React, { ReactNode, FC } from "react";
import {
  DragDropContext,
  DropResult,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { onBoardDragAndDrop } from "../features/boards/boardsSlice";
import { Boards } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import dynamic from "next/dynamic";

const BoardsSummary = dynamic(
  () => import("../features/boards/BoardsSummary"),
  { ssr: false }
);

interface IAppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const handleDragAndDrop = (result: DropResult) => {
    console.log({ dropResult: result });
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    console.log({ destination, source });

    let dIndex = destination?.index as number;
    let sIndex = source?.index;

    let allBoards: Boards = [];
    let selected = boards[source.index];
    for (let i = 0; i < boards.length; i++) {
      if (i === destination.index) {
        if (sIndex > dIndex) {
          allBoards.push(selected);
          allBoards.push(boards[i]);
        } else {
          allBoards.push(boards[i]);
          allBoards.push(selected);
        }
      } else if (i === source.index) {
        continue;
      } else {
        allBoards.push(boards[i]);
      }
    }

    dispatch(onBoardDragAndDrop(allBoards));
  };
  return (
    <div className="h-screen bg-gray-800 text-gray-50 flex ">
      {/* for "md" and large */}
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className="w-1/5 hidden md:block border-r border-r-gray-400 overflow-y-auto overflow-x-hidden">
          <BoardsSummary />
        </div>
      </DragDropContext>
      <div className="w-4/5 h-screen flex justify-center items-center  overflow-x-auto overflow-y-hidden">
        {children}
      </div>
      {/* for smaller than "md" */}
    </div>
  );
};
