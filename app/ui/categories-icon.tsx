"use client";

import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { useDashboard } from "../hooks/useContext";

type CategoriesIconType = {
  width: number;
  height: number;
}

export const CategoriesIcon = ({width, height}: CategoriesIconType) => {
  const { handleModal } = useDashboard();

  return (
    <button
      aria-label="open categories modal"
      className="flex items-center sm:flex-row sm:ml-8  flex-col gap-1 h-full sm:w-32 sm:rounded-lg hover:bg-black/25 focus:bg-black/25 hover:cursor-pointer"
      onClick={() => handleModal(false, true)}
    >
      <Squares2X2Icon color="white" width={width} height={height} />
      <p className="text-white">Categories</p>
    </button>
  );
};
