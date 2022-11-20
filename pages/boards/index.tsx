import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import BoardsSummary from "../../components/BoardsSummary";

const Boards = () => {
  const router = useRouter();
  const { boards } = useAppSelector((state) => state);
  const redirectToHome = () => {
    if (screen.width > 768) {
      router.push("/");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", redirectToHome);

    return () => window.removeEventListener("resize", redirectToHome);
  }, []);
  return (
    <div>
      <div className="mt-8 md:hidden text-green-400 text-3xl font-medium text-center">
        Boards List
      </div>
      <BoardsSummary boards={boards} />
    </div>
  );
};
export default Boards;
