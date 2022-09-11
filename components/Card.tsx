import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteCard, editCard } from "../features/boards/boardsSlice";
import { ICard } from "../types/types";

interface ICardProps extends ICard {
  boardId?: string;
  columnId?: string;
}

export const Card = (props: ICardProps) => {
  const { boardId, columnId, id: cardId, title, details } = props;
  const [cardTitle, setCardTitle] = useState("");
  const [cardDetails, setCardDetails] = useState<string | undefined>("");
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (boardId && columnId) {
      dispatch(editCard({ boardId, columnId, cardId, cardTitle, cardDetails }));
    }
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
    setCardTitle(title);
    setCardDetails(details);
  };

  const handleDelete = () => {
    if (boardId && columnId) {
      dispatch(deleteCard({ boardId, columnId, cardId }));
    }
  };

  useEffect(() => {
    setCardTitle(title);
    setCardDetails(details);
  }, [edit]);

  return (
    <div className=" border border-gray-500 rounded-md p-2 text-white  bg-gray-700 cursor-grabbing hover:border-gray-300 flex flex-col gap-2">
      <h2 className="font-semibold text-blue-200 flex items-start justify-between gap-1 ">
        <div className="flex items-start gap-1">
          <span className="mt-px">&#9737;</span>
          {!edit ? (
            <div>{title}</div>
          ) : (
            <input
              autoFocus
              type="text"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              className="w-[100%] rounded-sm text-gray-700 font-normal px-1"
            />
          )}
        </div>
        <Menu as="div" className="relative">
          {({ open }) => {
            return (
              <>
                <Menu.Button className="cursor-pointer">&#8942;</Menu.Button>
                <Menu.Items className="origin-top-right absolute right-0  w-24 rounded-sm shadow-lg bg-white ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                  <Menu.Item>
                    <div
                      className="rounded-sm text-gray-600 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 font-medium"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      className="rounded-sm text-gray-600 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 font-medium"
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </>
            );
          }}
        </Menu>
      </h2>
      {details && (
        <p className=" text-[13px] p-2 rounded-md bg-gray-800/50">
          {!edit ? (
            details
          ) : (
            <textarea
              value={cardDetails}
              onChange={(e) => setCardDetails(e.target.value)}
              className="w-[100%] text-[13px] p-2   rounded-sm text-gray-700 font-normal px-1"
            />
          )}
        </p>
      )}
      {edit && (
        <div className="flex justify-center items-center gap-2 text-sm">
          <button className="border rounded-sm px-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="border rounded-sm px-2" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};
