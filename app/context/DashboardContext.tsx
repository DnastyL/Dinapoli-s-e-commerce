"use client";
import { createContext, useReducer, useState } from "react";
import { eletronicProducts } from "@/app/lib/definitions";
import { Actions } from "./reducerActions/cartProducts";
import { State, initialState, reducer } from "./reducer/CartProducts";

type DashBoardContextType = {
  isCartOpen: boolean;
  isCategoriesOpen: boolean;
  state: State;
  dispatch: React.Dispatch<Actions>;
  handleModal: (isCart?: boolean, isCategoriesOpen?: boolean) => void;
};

// const defaultValue: DashBoardContextType = {
//   isCartOpen: false,
//   setIsCartOpen: () => {},
// };

export const DashboardContext = createContext<DashBoardContextType>(
  {} as DashBoardContextType
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("categories: ", isCategoriesOpen);
  console.log("cart: ", isCartOpen);

  const handleModal = (isCart?: boolean, isCategories?: boolean) => {
    if (isCart) return setIsCartOpen(!isCartOpen);
    if (isCategories) return setIsCategoriesOpen(!isCategoriesOpen);
    setIsCartOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <>
      <DashboardContext.Provider
        value={{
          isCartOpen,
          isCategoriesOpen,
          state,
          dispatch,
          handleModal,
        }}
      >
        {children}
      </DashboardContext.Provider>
    </>
  );
};
