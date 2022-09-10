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
// import DroppableCards from "./DroppableCards";
import dynamic from "next/dynamic";

const DroppableCards = dynamic(() => import("./DroppableCards"), {
  ssr: false,
});

interface IColumnProps extends IColumn {
  boardId: string;
}

const Column = (props: IColumnProps) => {
  const { boardId, id, title, cards } = props;

  const handleDragAndDrop = (result: DropResult) => {
    console.log({ dropResult: result });
    const { destination, source } = result;
  };
  return (
    <>
      <DroppableCards {...props} />
      {/* <Droppable droppableId={`CardsList-of-column-${title}-columnId-${id}`}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={`relative min-w-48 h-[100%] overflow-y-auto overflow-x-hidden border-gray-500 rounded-md  ${
              droppableSnapshot.isDraggingOver
                ? "bg-gray-700 border-2 border-gray-200 rounded-sm pt-4"
                : ""
            }`}
          >
            <div className="p-2  md:w-56 flex flex-col justify-center  gap-4">
              <h2 className="sticky top-0 w-full text-gray-200 border-b border-gray-500 font-semibold bg-gray-600">
                {title}
              </h2>
              <div className=" flex flex-col gap-2 overflow-y-auto">
                {cards.map((card, index) => (
                  <Draggable
                    draggableId={card.title + card.id + index}
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
                        key={card.id}
                      >
                        <Card {...card} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
                <AddCard boardId={boardId} columnId={id} />
              </div>
            </div>
          </div>
        )}
      </Droppable> */}
    </>
  );
};

export default Column;
