import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { addNewBoard } from "./boardsSlice";
import { v4 as uuidv4 } from "uuid";

type Props = {};

export const AddBoard = (props: Props) => {
  const dispatch = useAppDispatch();
  const [boardTitle, setBoardTitle] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNewBoard({ boardId: uuidv4(), boardTitle }));
    setBoardTitle("");
    setOpenForm(false);
  };

  return (
    <>
      {openForm && (
        <div className="w-11/12 h-24 md:h-20 lg:h-24 xl:h-28 border border-gray-400   rounded-md text-lg text-gray-300">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-2 lg:gap-4 h-24 md:h-20 lg:h-24 xl:h-28"
          >
            <input
              autoFocus
              type="text"
              placeholder="Title"
              value={boardTitle}
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
          className="w-11/12 h-24 md:h-20 lg:h-24 xl:h-28 flex justify-center items-center border border-gray-500 rounded-md cursor-pointer text-[48px] text-gray-500 hover:border-gray-400 hover:text-gray-300"
          onClick={() => setOpenForm(true)}
        >
          <FaPlus className="p-4 h-24 md:h-20 lg:h-24 xl:h-28" />
        </div>
      )}
    </>
  );
};
