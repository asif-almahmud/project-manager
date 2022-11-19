import React from "react";
import { Board } from "./Board";
import { AddBoard } from "./AddBoard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type Props = {};

const BoardsSummary = (props: Props) => {
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  return (
    <Droppable droppableId="BoardsList">
      {(doppableProvided, droppableSnapshot) => (
        <div
          ref={doppableProvided.innerRef}
          {...doppableProvided.droppableProps}
          className={`md:h-screen overflow-y-auto p-8 pb-24 flex flex-col flex-nowrap gap-6  ${
            droppableSnapshot.isDraggingOver
              ? "bg-gray-700 border-1 border-gray-200 rounded-sm overflow-hidden"
              : ""
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
                    draggableSnapshot.isDragging
                      ? "drop-shadow-2xl cursor-grabbing"
                      : ""
                  }`}
                >
                  <Board title={board.title} id={board.id} key={board.title} />
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
