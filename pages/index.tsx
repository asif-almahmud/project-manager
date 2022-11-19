import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
// import { order, restock } from "../features/cake/cakeSlice";
// import {
//   order as orderIcecream,
//   restock as restockIcecream,
// } from "../features/icecream/icecreamSlice";
import type { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
// import { BoardsSummary } from "../features/boards/BoardsSummary";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { onBoardDragAndDrop } from "../features/boards/boardsSlice";
import { Boards } from "../types/types";
import { AppLayout } from "../components/AppLayout";

// const BoardsSummary = dynamic(
//   () => import("../features/boards/BoardsSummary"),
//   { ssr: false }
// );

const selectValue = (state: RootState) => [];

const Home: NextPage = () => {
  const [numberOfCakes, numberOfIcecreams] = useAppSelector(selectValue);
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleSidebarNavigation = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center p-8">
      <Head>
        <title>Progressivo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <AppLayout> */}
      <div>
        <h1 className="mb-2 text-2xl sm:text-3xl md:text-3xl font-semibold text-green-300 border-b-2 border-b-green-200">
          Progress with Progressivo
        </h1>
        <ul className="text-md italic text-blue-300 list-disc ml-6">
          <li>Your one-stop project manager</li>

          <li>
            Create a project, add state defining columns and add new tasks to
            them when required
          </li>

          <li>
            Move the tasks between different states ( columns ) using drag and
            drop
          </li>
          <li>
            If needed use drag and drop to reorder the boards and columns also
          </li>
          {/* <li>
            One setback - this app usage local storage ( 5mb ) for storing the
            data
          </li> */}
        </ul>
      </div>
      {/* </AppLayout> */}
    </div>
  );
};

export default Home;
