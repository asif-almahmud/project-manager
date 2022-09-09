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
      <a>
        <div className="w-11/12 h-24 md:20 xl:h-28 flex justify-center items-center bg-gray-600 rounded-md cursor-pointer text-lg text-gray-300 drop-shadow-xl active:bg-gray-600/80">
          {title}
        </div>
      </a>
    </Link>
  );
};
