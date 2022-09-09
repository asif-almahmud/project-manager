import React from "react";
import { AppLayout } from "../../components/AppLayout";
import BoardsSummary from "../../features/boards/BoardsSummary";

type Props = {};

const Boards = (props: Props) => {
  return (
    <>
      <div className="hidden md:block text-green-400 text-3xl font-semibold">
        Select A Board To Start With
      </div>
      <div className=" md:hidden text-green-400 text-3xl font-semibold">
        Boards List
      </div>
    </>
  );
};
export default Boards;
