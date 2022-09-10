import React from "react";
import { ICard } from "../types/types";

export const Card = (props: ICard) => {
  const { id, title, details } = props;

  return (
    <div className=" border border-gray-500 rounded-md p-2 text-white  bg-gray-700 cursor-grabbing hover:border-gray-300 flex flex-col gap-2">
      <h2 className="font-semibold text-blue-200 flex items-start gap-1 ">
        <span className="mt-px">&#9737;</span> {title}
      </h2>
      {details && (
        <p className=" text-[13px] p-2 rounded-md bg-gray-800/50">{details}</p>
      )}
    </div>
  );
};
