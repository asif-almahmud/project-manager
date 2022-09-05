import React from "react";
import { AppLayout } from "../../components/AppLayout";
import BoardsSummary from "../../features/boards/BoardsSummary";

type Props = {};

const Boards = (props: Props) => {
  return (
    <>
      <div className="hidden md:block text-green-400 text-3xl font-semibold">
        Select A Board
      </div>
    </>
  );
};
export default Boards;
