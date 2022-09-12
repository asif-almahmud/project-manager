import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

interface IModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

export const Modal = (props: IModalProps) => {
  const { show, setShow, handleDelete } = props;
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div
        onClick={() => setShow(false)}
        className="bg-gray-800 opacity-70 fixed inset-0 z-[1000]"
      ></div>
      <div className="w-60 h-44 p-4 z-[1001] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-gray-100 rounded-sm  flex flex-col justify-center items-center">
        <div className="flex text-lg text-gray-800 mb-10  ">Are you sure?</div>
        <div className="flex gap-4">
          <button
            onClick={() => setShow(false)}
            className="rounded-sm px-4 py-2 text-white bg-blue-400 hover:bg-blue-500"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="rounded-sm px-4 py-2 text-white bg-green-600/70 hover:bg-green-600"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById("modal-root") as Element | DocumentFragment
    );
  } else {
    return null;
  }
};
