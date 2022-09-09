import React from "react";
import {
  DragDropContext,
  DropResult,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import { IBoard } from "../types/types";
import { AddColumn } from "./AddColumn";
import { Column } from "./Column";
import { v4 as uuidv4 } from "uuid";

interface IDroppableColumnsProps {
  board: IBoard;
  boardId: string;
}

const DroppableColumns = (props: IDroppableColumnsProps) => {
  const { board, boardId } = props;

  return (
    <Droppable
      droppableId={`ColumnsList-of-${board.title}-boardId-${boardId}`}
      direction="horizontal"
    >
      {(doppableProvided, droppableSnapshot) => (
        <div
          ref={doppableProvided.innerRef}
          {...doppableProvided.droppableProps}
          className={`flex overflow-x-auto ${
            droppableSnapshot.isDraggingOver
              ? "bg-gray-700 border-2 border-gray-200 rounded-sm pt-4"
              : ""
          }`}
        >
          <div className="h-[82.7vh] ml-8 flex gap-12 items-start ">
            {board?.columns?.length > 0 &&
              board?.columns?.map((column, index) => (
                <Draggable
                  draggableId={column.title + column.id + index}
                  index={index}
                  key={uuidv4()}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={`relative min-w-48 h-[95%] overflow-y-auto overflow-x-hidden border-2 drop-shadow-2xl border-gray-500 bg-gray-600 rounded-md ${
                        draggableSnapshot.isDragging
                          ? "drop-shadow-2xl cursor-grabbing"
                          : ""
                      }`}
                    >
                      <Column boardId={boardId} {...column} key={column.id} />
                    </div>
                  )}
                </Draggable>
              ))}
            {doppableProvided.placeholder}
            <AddColumn boardId={boardId} />
            <div className="w-8 h-8 text-transparent">&nbsp;</div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default DroppableColumns;
