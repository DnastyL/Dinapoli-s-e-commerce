"use client";

import { useDashboard } from "@/app/hooks/useContext";
import {
  PowerIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChevronRight } from "react-feather";
import { ListItem } from "./categoriesModalCompo/list-items";
import { Session } from "next-auth";
import Link from "next/link";
import { logout } from "@/app/lib/actions";

export const CategoriesModal = ({ session }: { session: Session | null }) => {
  const { handleModal,} = useDashboard();
  const [axis, setAxis] = useState(0);
  const fakeElectronicItems = ["SSD", "WD", "Screen"];

  function handleAxis(axis: number) {
    setAxis(axis);
  }

  return (
    <div className="bg-white w-full h-full" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center w-full bg-[#131921] h-12 sm:justify-between">
        {!!session ? (
          <span className="ml-8 flex items-center gap-2">
            <UserCircleIcon width={26} />
            <h2 className="text-white font-semibold text-lg">
              Hello, {session.user?.name}
            </h2>
          </span>
        ) : (
          <a href="/login" id="link-to-signIn" className="flex items-center">
            <span className="ml-8 flex items-center gap-2">
              <UserCircleIcon width={26} />
              <h2 className="text-white font-semibold text-lg">
                Hello, sign in
              </h2>
            </span>
          </a>
        )}

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
                {!!session ? (
                  <div className="group pl-8 h-10 gap-2 hover:bg-blue-gray-100/50 hover:cursor-pointer">
                    <form action={logout} className="w-full h-full">
                      <button
                        aria-label="Click to log out"
                        type="submit"
                        className="text-black-medium w-full text-sm flex items-center gap-2 h-full"
                        onClick={() => handleModal(false, false)}
                      >
                      <PowerIcon className="h-6 text-black-medium" />
                        Sign out
                      </button>
                    </form>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="group pl-8 h-10 hover:bg-blue-gray-100/50 hover:cursor-pointer flex items-center"
                  >
                    <p className="text-black-medium w-max text-sm">Sign in</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <ListItem
            category="Electronics"
            handleAxis={handleAxis}
            items={fakeElectronicItems}
          />
        </div>
      </section>
    </div>
  );
};
