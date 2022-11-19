import React, { useEffect, useState } from "react";
import { IColumn } from "../types/types";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useAppDispatch } from "../app/hooks";
import { deleteColumn, editColumn } from "../features/boards/boardsSlice";
import { DropdownMenu } from "./DropdownMenu";
import { Modal } from "./Modal";
import { FaPlus } from "react-icons/fa";

interface IDroppableCardsProps extends IColumn {
  boardId: string;
}

const DroppableCards = (props: IDroppableCardsProps) => {
  const { boardId, id: columnId, title, cards } = props;
  const [edit, setEdit] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(editColumn({ boardId, columnId, columnTitle }));
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ boardId, columnId }));
  };

  useEffect(() => {
    setColumnTitle(title);
  }, [edit]);

  return (
    <>
      <Modal
        show={showModal}
        setShow={setShowModal}
        handleDelete={handleDelete}
      />
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
            className={`min-w-48 h-[100%] overflow-y-auto overflow-x-hidden border-gray-500 rounded-md  ${
              droppableSnapshot.isDraggingOver
                ? "outline outline-1 outline-gray-300  rounded-md"
                : ""
            }`}
          >
            <div className="w-48" />
            <div className="px-2 pb-2 flex flex-col justify-center  gap-4">
              <h2
                className={`z-10 py-2 sticky top-0 w-full text-gray-200 border-b border-gray-500 font-semibold bg-gray-600 flex justify-between${
                  droppableSnapshot.isDraggingOver
                    ? " border-b-2 text-white border-gray-200 "
                    : ""
                }`}
              >
                {!edit ? (
                  <div>{title}</div>
                ) : (
                  <div className="flex flex-col gap-3 m-2">
                    <input
                      autoFocus
                      type="text"
                      value={columnTitle}
                      onChange={(e) => setColumnTitle(e.target.value)}
                      className="w-[100%] rounded-sm text-gray-700 font-normal px-1"
                    />
                    <div className="flex justify-center items-center gap-2 text-sm">
                      <button
                        className="border rounded-sm px-2"
                        onClick={() => setEdit(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="border rounded-sm px-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-center items-center ">
                  <FaPlus
                    onClick={() => setOpenForm(true)}
                    className=" w-6 h-6 p-[5px]  rounded-full cursor-pointer text-sm text-gray-400 hover:bg-gray-200/30 hover:text-gray-100"
                  />

                  <DropdownMenu
                    setEdit={setEdit}
                    setShowModalBeforeDelete={setShowModal}
                  />
                </div>
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
                          className={`${
                            draggableSnapshot.isDragging ? " " : ""
                          }`}
                        >
                          <Card
                            boardId={boardId}
                            columnId={columnId}
                            {...card}
                          />
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {droppableProvided.placeholder}
                <AddCard
                  boardId={boardId}
                  columnId={columnId}
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                />
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default DroppableCards;
