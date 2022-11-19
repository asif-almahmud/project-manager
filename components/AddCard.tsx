import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { v4 as uuidv4 } from "uuid";
import { addNewCard } from "../features/boards/boardsSlice";

interface IAddCardProps {
  boardId: string;
  columnId: string;
  openForm: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCard = (props: IAddCardProps) => {
  const { boardId, columnId, openForm, setOpenForm } = props;
  const dispatch = useAppDispatch();
  const [cardTitle, setCardTitle] = useState("");
  const [cardDetails, setCardDetails] = useState("");

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
    dispatch(addNewCard(payload));
    setCardTitle("");
    setCardDetails("");
    setOpenForm(false);
  };

  return (
    <div className="  border-gray-500 rounded-md text-white  bg-gray-700  hover:border-gray-300 flex flex-col gap-px">
      <div className=" ">
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
                  className="w-5/6 self-center bg-gray-500/80 px-2 rounded-md text-white focus:outline focus:outline-2 focus:outline-green-400 focus:border-none h-6 lg:h-auto text-base p-1"
                />
                <textarea
                  cols={50}
                  rows={3}
                  value={cardDetails}
                  onChange={handleDetailsChange}
                  placeholder="Details..."
                  className="w-5/6 self-center bg-gray-500/80 px-2 rounded-md text-white focus:outline focus:outline-2 focus:outline-green-400 focus:border-none h-6 lg:h-auto text-base p-1"
                ></textarea>

                <input
                  type="submit"
                  value="Submit"
                  className="w-5/6 self-center cursor-pointer"
                />
              </form>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
