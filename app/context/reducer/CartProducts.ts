import { eletronicProducts } from "@/app/lib/definitions";
import { ActionTypes, Actions } from "../reducerActions/cartProducts";

export type State = {
  cartProducts: eletronicProducts[];
};

export const initialState: State = {
  cartProducts: [],
};

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_CART_PRODUCT: {
      return {
        cartProducts: [...state.cartProducts, action.payload],
      };
    }
    case ActionTypes.REMOVE_CART_PRODUCT: {
      const stateCopy = { ...state };
      
      const product = stateCopy.cartProducts.findIndex(
        (p) => p.id === action.payload
        );
        
        const stateParsed = stateCopy.cartProducts.toSpliced(product, 1);

      return{
        cartProducts: stateParsed 
      };       
    }
    case ActionTypes.HANDLE_QUANTITY: {
      const stateCopy = { ...state };
      const product = stateCopy.cartProducts.findIndex(
        (p) => p.id === action.payload.id
      );
      stateCopy.cartProducts.splice(product, 1, action.payload);

      return stateCopy;
    }

    default:
      return state;
  }
}
