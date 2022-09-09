import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { IColumn } from "../types/types";
import { Card } from "./Card";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { type } from "os";
import { addNewColumn } from "../features/boards/boardsSlice";

interface IAddColumnProps {
  boardId: string;
}

export const AddColumn = (props: IAddColumnProps) => {
  const { boardId } = props;
  const dispatch = useAppDispatch();
  const [columnTitle, setColumnTitle] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNewColumn({ boardId, columnId: uuidv4(), columnTitle }));
    setColumnTitle("");
    setOpenForm(false);
  };

  return (
    <div className="w-48 flex flex-col items-center gap-2">
      <div className="w-full border border-gray-500 rounded-md hover:border-gray-400">
        <>
          {openForm && (
            <div className=" h-24 md:h-20 lg:h-24 xl:h-28   text-lg text-gray-300">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-2 lg:gap-4 h-24 md:h-20 lg:h-24 xl:h-28"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Title"
                  value={columnTitle}
                  onChange={handleChange}
                  required
                  className="w-4/5 self-center bg-gray-500 px-2 rounded-md text-gray-200 focus:outline focus:outline-2 focus:outline-green-400 focus:border-none h-6 lg:h-auto"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="w-4/5 self-center cursor-pointer"
                />
              </form>
            </div>
          )}
          {!openForm && (
            <div
              className=" h-24 md:h-20 lg:h-24 xl:h-28 flex justify-center items-center  cursor-pointer text-[48px] text-gray-500 hover:border-gray-400 hover:text-gray-300"
              onClick={() => setOpenForm(true)}
            >
              <FaPlus className="p-4 h-24 md:h-20 lg:h-24 xl:h-28" />
            </div>
          )}
        </>
      </div>
      <h4 className="text-sm text-gray-200">Add New Column</h4>
    </div>
  );
};
