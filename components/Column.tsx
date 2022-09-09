import React from "react";
import { IColumn } from "../types/types";
import { AddCard } from "./AddCard";
import { Card } from "./Card";

interface IColumnProps extends IColumn {
  boardId: string;
}

export const Column = (props: IColumnProps) => {
  const { boardId, id, title, cards } = props;
  return (
    <div className="relative min-w-48 h-[100%] overflow-y-auto overflow-x-hidden border-gray-500 rounded-md ">
      <div className="p-2  md:w-56 flex flex-col justify-center  gap-4">
        <h2 className="sticky top-0 w-full text-gray-200 border-b border-gray-500 font-semibold bg-gray-600">
          {title}
        </h2>
        <div className=" flex flex-col gap-2 overflow-y-auto">
          {cards.map((card) => (
            <Card {...card} key={card.id} />
          ))}
          <AddCard boardId={boardId} columnId={id} />
        </div>
      </div>
    </div>
  );
};
