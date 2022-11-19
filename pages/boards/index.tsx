import React from "react";
import { AppLayout } from "../../components/AppLayout";
import BoardsSummary from "../../components/BoardsSummary";

type Props = {};

const Boards = (props: Props) => {
  return (
    <>
      <div className="mt-8 md:hidden text-green-400 text-3xl font-medium text-center">
        Boards List
      </div>
      <BoardsSummary />

      {/* <div className=" md:hidden text-green-400 text-3xl font-semibold">
        Boards List
      </div> */}
    </>
  );
};
export default Boards;
