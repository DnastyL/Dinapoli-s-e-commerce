"use client";

import { useDashboard } from "@/app/hooks/useContext";
import { useEffect } from "react";
import { CartModal } from "./cart-modal";
import { CategoriesModal } from "./categories-modal";
import clsx from "clsx";
import { Session } from "next-auth";

export const ModalRoot = ({ session }: { session: Session | null }) => {
  const { isCartOpen, isCategoriesOpen, handleModal } = useDashboard();

  useEffect(() => {
    let dashboard = document.getElementById("dashboard");
    if (isCategoriesOpen || isCartOpen) {
      if (dashboard) dashboard.style.overflow = "hidden";
    }

    return () => {
      if (dashboard) dashboard.style.overflow = "auto";
    };
  }, [isCategoriesOpen, isCartOpen]);

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-[999px] bg-black/50 transition-all ease-in-out duration-1000",
          {
            "visible opacity-100": isCategoriesOpen || isCartOpen,
            "invisible opacity-0": !isCartOpen && !isCategoriesOpen,
          }
        )}
        onClick={() => handleModal(false, false)}
      >
        <div
          className="fixed left-0 h-full transition-transform ease-in-out duration-700"
          aria-label="categories modal"
          aria-modal={true}
          style={{
            transform: isCategoriesOpen
              ? `translateX(0)`
              : `translateX(-599px)`,
          }}
        >
          <CategoriesModal session={session} />
        </div>

        <div
          className={clsx(
            "fixed right-0 h-full transition-transform ease-in-out duration-700"
          )}
          style={{
            transform: isCartOpen ? `translateX(0)` : `translateX(799px)`,
          }}
        >
          <CartModal />
        </div>
      </div>
    </>
  );
};
