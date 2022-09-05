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
import { useRouter } from "next/router";

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
  const { query } = useRouter();
  console.log({ query });

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
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="min-h-screen bg-gray-800 text-gray-50 flex flex-col items-center md:flex-row-reverse ">
        {/* for "md" and large */}

        <div className="w-full md:w-3/4 lg:w-4/5 p-8 pt-16 md:pt-0  md:h-screen flex justify-center md:items-center  md:overflow-x-auto md:overflow-y-hidden">
          {children}
        </div>

        <div className="w-4/5 sm:w-3/5 md:w-1/4 lg:w-1/5 p-8 pt-0 md:p-0  md:block md:border-r border-r-gray-400 md:overflow-y-auto md:overflow-x-hidden">
          <BoardsSummary />
        </div>

        {/* for smaller than "md" */}
      </div>
    </DragDropContext>
  );
};
// flex-row-reverse md:flex-col
