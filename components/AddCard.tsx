import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { ICard } from "../types/types";
import { Card } from "./Card";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { type } from "os";
import { addNewCard } from "../features/boards/boardsSlice";

interface IAddCardProps {
  boardId: string;
  columnId: string;
}

export const AddCard = (props: IAddCardProps) => {
  const { boardId, columnId } = props;
  const dispatch = useAppDispatch();
  const [cardTitle, setCardTitle] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardDetails(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      boardId,
      columnId,
      cardId: uuidv4(),
      cardTitle,
      cardDetails,
    };
    console.log({ payload });
    dispatch(addNewCard(payload));
    setCardTitle("");
    setCardDetails("");
    setOpenForm(false);
  };

  return (
    <div className=" border border-gray-500 rounded-md text-white  bg-gray-700  hover:border-gray-300 flex flex-col gap-px">
      <div className="w-full ">
        <>
          {openForm && (
            <div className=" p-2 pt-4 min-h-24 md:min-h-20 lg:min-h-24 xl:min-h-28 text-lg text-gray-300">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-2 lg:gap-4 min-h-24 md:min-h-20 lg:min-h-24 xl:min-h-28"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Title"
                  value={cardTitle}
                  onChange={handleTitleChange}
                  required
                  className="w-4/5 self-center bg-gray-500 px-2 rounded-md text-white focus:outline focus:outline-2 focus:outline-green-400 focus:border-none h-6 lg:h-auto"
                />
                <textarea
                  cols={50}
                  rows={2}
                  value={cardDetails}
                  onChange={handleDetailsChange}
                  placeholder="Details..."
                  className="w-4/5 self-center bg-gray-500 px-2 rounded-md text-white focus:outline focus:outline-2 focus:outline-green-400 focus:border-none h-6 lg:h-auto"
                ></textarea>

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
    </div>
  );
};
