import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetBoardById } from "../../hooks/useGetBoardById";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiViewBoards } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";
import { deleteBoard, editBoard } from "../../features/boards/boardsSlice";
import { Modal } from "../../components/Modal";
import Link from "next/link";
const DroppableColumns = dynamic(
  () => import("../../components/DroppableColumns"),
  { ssr: false }
);

const Board = () => {
  const router = useRouter();
  const {
    query: { boardId },
  } = router;
  const id = boardId as string;
  const board = useGetBoardById(id);
  const [boardTitle, setBoardTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editBoard({ boardId: id, boardTitle }));
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteBoard({ boardId: id }));
    setShowModal(false);
  };

  const handleCancel = () => {
    setBoardTitle(board.title);
    setEdit(false);
  };

  useEffect(() => {
    if (!board) {
      router.push("/");
    }
    setBoardTitle(board?.title);
    setEdit(false);
  }, [id, board]);

  return (
    <>
      <div className="h-screen">
        <div className="h-[15vh] ml-8 flex items-center justify-between md:justify-center ">
          <div className="flex items-start">
            {!edit ? (
              <h2 className="text-2xl text-green-300 font-medium border-b-2 border-green-300">
                {board?.title}
              </h2>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2"
              >
                <input
                  autoFocus
                  required
                  type="text"
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  className="text-gray-600 p-1 rounded-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="submit"
                    value="Save"
                    className="px-4 border rounded-sm cursor-pointer"
                  />
                  <button
                    onClick={handleCancel}
                    className="px-4 border rounded-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {board?.title && !edit && (
              <>
                <MdEdit
                  onClick={() => setEdit(true)}
                  className="ml-4 mt-1 w-8 h-8 p-2  rounded-full cursor-pointer text-sm text-gray-500 hover:bg-gray-200/30 hover:text-gray-100"
                />
                <MdDelete
                  onClick={() => setShowModal(true)}
                  className="mt-1 w-8 h-8 p-2  rounded-full cursor-pointer text-sm text-gray-500 hover:bg-gray-200/30 hover:text-gray-100"
                />
              </>
            )}
          </div>
          <Link href={`/boards`}>
            <a>
              <HiViewBoards className="block md:hidden mt-1 mr-4 w-8 h-8 p-2  rounded-full cursor-pointer text-sm text-gray-500 hover:bg-gray-200/30 hover:text-gray-100 rotate-90" />
            </a>
          </Link>
        </div>

        <DroppableColumns board={board} boardId={id} />
      </div>
      <Modal
        show={showModal}
        setShow={setShowModal}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Board;
