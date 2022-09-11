import React from "react";
import { IColumn } from "../types/types";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import {
  DragDropContext,
  DropResult,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

interface IDroppableCardsProps extends IColumn {
  boardId: string;
}

const DroppableCards = (props: IDroppableCardsProps) => {
  const { boardId, id: columnId, title, cards } = props;

  return (
    <Droppable
      droppableId={`ColumnId-${columnId}`}
      direction="vertical"
      type={`droppableCards`}
      renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card {...cards[rubric.source.index]} />
        </div>
      )}
    >
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={` min-w-48 h-[100%] overflow-y-auto overflow-x-hidden border-gray-500 rounded-md  ${
            droppableSnapshot.isDraggingOver
              ? "outline outline-1 outline-gray-300  rounded-md"
              : ""
          }`}
        >
          <div className="p-2  md:w-56 flex flex-col justify-center  gap-4">
            <h2
              className={`sticky top-0 w-full text-gray-200 border-b border-gray-500 font-semibold bg-gray-600 ${
                droppableSnapshot.isDraggingOver
                  ? " border-b-2 text-white border-gray-200 "
                  : ""
              }`}
            >
              {title}
            </h2>
            <div className=" flex flex-col gap-2 ">
              {cards.map((card, index) => (
                <div key={card.id}>
                  <Draggable draggableId={card.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className={`${draggableSnapshot.isDragging ? " " : ""}`}
                      >
                        <Card boardId={boardId} columnId={columnId} {...card} />
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
              {droppableProvided.placeholder}
              <AddCard boardId={boardId} columnId={columnId} />
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default DroppableCards;
