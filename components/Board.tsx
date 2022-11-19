import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface IProps {
  title: string;
  id: string;
}

export const Board = (props: IProps) => {
  const { title, id } = props;

  return (
    <Link href={`/${id}`}>
      <a className="h-24 xl:h-28 flex justify-center items-center bg-gray-600 rounded-md cursor-pointer text-lg text-gray-300 drop-shadow-xl hover:bg-gray-500/80 active:bg-gray-600 ease-in-out duration-300">
        {title}
      </a>
    </Link>
  );
};
