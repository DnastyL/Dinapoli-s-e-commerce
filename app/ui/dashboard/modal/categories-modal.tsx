"use client";

import { useDashboard } from "@/app/hooks/useContext";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChevronRight } from "react-feather";
import { ListItem } from "./categoriesModalCompo/list-items";

export const CategoriesModal = () => {
  const { handleModal } = useDashboard();
  const [axis, setAxis] = useState(0);
  const fakeElectronicItems = ["SSD", "WD", "Screen"]

  function handleAxis(axis: number) {
    setAxis(axis);
  }

  return (
    <div className="bg-white w-96 h-full" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center w-full bg-[#131921] h-12 justify-between">
        <a href="/" id="link-to-signIn" className="flex items-center">
          <span className="ml-8 flex items-center gap-2">
            <UserCircleIcon width={26} />
            <h2 className="text-white font-semibold text-lg">Hello, sign in</h2>
          </span>
        </a>
        <button
          aria-label="close modal"
          type="button"
          className="mr-5"
          onClick={() => handleModal(false, false)}
        >
          <XMarkIcon width={30} height={26} color="white" />
        </button>
      </div>
      <section className="w-[384px] flex h-full overflow-x-hidden relative ">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${axis * 50}%)` }}
        >
          <div className="w-[384px] flex h-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-2 justify-around py-3 border-b border-blue-gray-100">
                <h2 className="text-black-medium ml-8 font-bold text-lg">
                  Shop
                </h2>
                <a
                  aria-label="Open Eletronic Category"
                  className="group pl-8 h-10 hover:bg-blue-gray-100/50 hover:cursor-pointer flex items-center"
                  onClick={() => handleAxis(1)}
                >
                  <p className="text-black-medium w-[85%] text-sm">
                    Electronics
                  </p>{" "}
                  <ChevronRight
                    className="group-hover:text-black text-gray"
                    size={22}
                  />
                </a>
              </div>
              <div className="flex flex-col gap-2 justify-around py-3">
                <h2 className="text-black-medium ml-8 font-bold text-lg">
                  Help & Settings
                </h2>
                <a className="group pl-8 h-10 hover:bg-blue-gray-100/50 hover:cursor-pointer flex items-center">
                  <p className="text-black-medium w-[85%] text-sm">Sign in</p>
                </a>
              </div>
            </div>
          </div>
          <ListItem category="Electronics" handleAxis={handleAxis} items={fakeElectronicItems} />
        </div>
      </section>
    </div>
  );
};
