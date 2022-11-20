import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IBoard } from "../types/types";
import { AddColumn } from "./AddColumn";
import dynamic from "next/dynamic";

const DroppableCards = dynamic(() => import("./DroppableCards"), {
  ssr: false,
});

interface IDroppableColumnsProps {
  board: IBoard;
  boardId: string;
}

const DroppableColumns = (props: IDroppableColumnsProps) => {
  const { board, boardId } = props;

  return (
    <Droppable
      droppableId={`BoardId~${boardId}`}
      direction="horizontal"
      type="droppableColumns"
    >
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`flex overflow-x-auto pt-4 ${
            droppableSnapshot.isDraggingOver
              ? "bg-gray-700 border-2 border-gray-200 rounded-sm "
              : ""
          }`}
        >
          <div className="h-[80vh] ml-8 flex flex-nowrap gap-8 items-start ">
            {board?.columns?.length > 0 &&
              board?.columns?.map((column, index) => (
                <Draggable
                  draggableId={column.id + column.title}
                  index={index}
                  key={column.id}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={`relative w-56 h-[95%]  border drop-shadow-2xl border-gray-500 bg-gray-600 rounded-md  cursor-grabbing ${
                        draggableSnapshot.isDragging
                          ? "drop-shadow-2xl border-gray-300 cursor-grabbing"
                          : ""
                      }`}
                    >
                      <DroppableCards boardId={boardId} {...column} />
                    </div>
                  )}
                </Draggable>
              ))}
            {droppableProvided.placeholder}
            <AddColumn boardId={boardId} />
            <div className="w-8 h-8 text-transparent">&nbsp;</div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default DroppableColumns;
