import { eletronicProducts } from "@/app/lib/definitions";

export enum ActionTypes {
  SET_CART_PRODUCT = "SET_CART_PRODUCT",
  REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT",
  HANDLE_QUANTITY = "HANDLE_QUANTITY",
}

export type SetCartProduct = {
  type: ActionTypes.SET_CART_PRODUCT;
  payload: eletronicProducts;
};

export type RemoveCartProduct = {
  type: ActionTypes.REMOVE_CART_PRODUCT;
  payload: number;
};
export type HandleQuantity = {
  type: ActionTypes.HANDLE_QUANTITY;
  payload: eletronicProducts;
};

export type Actions = SetCartProduct | RemoveCartProduct | HandleQuantity;
