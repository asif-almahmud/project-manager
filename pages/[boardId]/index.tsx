import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { AddColumn } from "../../components/AddColumn";
import { AppLayout } from "../../components/AppLayout";
import { Column } from "../../components/Column";
import { useGetBoardById } from "../../hooks/useGetBoardById";
const DroppableColumns = dynamic(
  () => import("../../components/DroppableColumns"),
  { ssr: false }
);

const Board = () => {
  const {
    query: { boardId },
  } = useRouter();
  console.log(boardId);

  const id = boardId as string;

  const board = useGetBoardById(id);

  return (
    <div className="h-screen">
      <h1 className="h-[15vh] ml-8 flex items-center  text-2xl text-green-300 font-medium ">
        {board?.title}
      </h1>
      <DroppableColumns board={board} boardId={id} />
    </div>
  );
};

export default Board;
