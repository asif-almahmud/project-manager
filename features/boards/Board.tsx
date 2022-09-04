import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface IProps {
  title: string;
}

export const Board = (props: IProps) => {
  const { title } = props;

  return (
    <Link href={`/${title}`}>
      <a>
        <div className="w-11/12 h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 flex justify-center items-center bg-gray-600 rounded-md cursor-pointer text-lg text-gray-300 drop-shadow-xl active:bg-gray-600/80">
          {title}
        </div>
      </a>
    </Link>
  );
};
