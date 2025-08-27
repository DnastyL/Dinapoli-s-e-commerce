"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDashboard } from "../hooks/useContext";
import { useRef } from "react";
import clsx from "clsx";

type CartIconType = {
  width: number;
  height: number;
};

export const CartIcon = ({ width, height }: CartIconType) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { handleModal, state, isCartOpen, isCategoriesOpen } = useDashboard();
  let itemsInCart = state.cartProducts.length;

  function handleClick() {
    buttonRef.current?.click();
  }

  return (
    <div
      className={clsx(
        "sm:w-full w-[50px] hover:cursor-pointer hover:sm:cursor-default transition-all duration-350 ease-linear sm:relative",
        {
          visible: !isCartOpen && !isCategoriesOpen,
          invisible: isCartOpen,
        }
      )}
      onClick={handleClick}
    >
      <div className="group w-full flex sm:flex-row-reverse flex-col items-center hover:sm:bg-transparent hover:bg-black/25 focus-visible:bg-black/25 sm:transition-all sm:duration-500 ease-in-out">
        <button
          ref={buttonRef}
          aria-label="Open Cart"
          type="button"
          onClick={() => handleModal(true, false)}
          className="h-full sm:h-[45px] sm:group-hover:hover:bg-black/25 group-focus-visible:focus-visible:bg-black/25 rounded-full duration-500 ease-in-out"
        >
          <ShoppingCartIcon color="white" width={width} height={height} />
        </button>
        <p className="text-white">Cart</p>
      </div>
      {itemsInCart > 0 && (
        <span className="sm:block hidden absolute sm:bottom-6 sm:left-11 md:left-14 bottom-7 bg-green-100 rounded-xl h-5 w-5 text-center text-black text-sm/6">
          {itemsInCart}
        </span>
      )}
    </div>
  );
};
