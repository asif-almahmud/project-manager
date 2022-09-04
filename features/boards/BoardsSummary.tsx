import React from "react";
import { Board } from "./Board";
import { AddBoard } from "./AddBoard";
import {
  DragDropContext,
  DropResult,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { onBoardDragAndDrop } from "../../features/boards/boardsSlice";
import { Boards } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type Props = {};

const BoardsSummary = (props: Props) => {
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  return (
    // "droppableId" is like naming the droppable area

    <Droppable droppableId="BoardsList">
      {(doppableProvided, droppableSnapshot) => (
        <div
          ref={doppableProvided.innerRef}
          {...doppableProvided.droppableProps}
          className={`h-screen overflow-y-auto p-6 pb-24 flex flex-col flex-nowrap gap-6  ${
            droppableSnapshot.isDraggingOver ? "bg-gray-700" : ""
          }`}
        >
          {boards.map((board, index) => (
            <Draggable
              draggableId={board.title + index}
              index={index}
              key={uuidv4()}
            >
              {(draggableProvided, draggableSnapshot) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  className={`${
                    draggableSnapshot.isDragging ? "drop-shadow-2xl" : ""
                  }`}
                >
                  <Board title={board.title} key={board.title} />
                </div>
              )}
            </Draggable>
          ))}
          {doppableProvided.placeholder}
          <AddBoard />
        </div>
      )}
    </Droppable>
  );
};

export default BoardsSummary;
