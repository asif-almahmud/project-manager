import { useEffect, useRef, useState } from "react";

interface IDropdownMenuProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalBeforeDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenu = (props: IDropdownMenuProps) => {
  const { setEdit, setShowModalBeforeDelete } = props;
  const [showMenuItems, setShowMenuItems] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target !== ref.current) {
        setShowMenuItems(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="cursor-pointer w-4 h-4 p-[12px] rounded-full flex justify-center items-center text-sm text-gray-400 hover:text-gray-100 hover:bg-gray-200/30"
        onClick={() => setShowMenuItems((prev) => !prev)}
      >
        &#8942;
      </div>

      {showMenuItems && (
        <div className="absolute right-[2px] top-[22px]  w-24 rounded-sm bg-white   divide-y divide-gray-200 focus:outline-none  drop-shadow-md  z-50">
          <div>
            <div
              className="py-2 rounded-sm text-gray-700 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 font-normal text-sm"
              onClick={() => {
                setEdit(true);
                setShowMenuItems(false);
              }}
            >
              Edit
            </div>
          </div>
          <div>
            <div
              className="py-2 rounded-sm text-gray-700 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 font-normal text-sm"
              onClick={() => setShowModalBeforeDelete(true)}
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
