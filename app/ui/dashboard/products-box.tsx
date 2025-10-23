"use client";
import { useDashboard } from "@/app/hooks/useContext";
import { eletronicProducts } from "@/app/lib/definitions";
import { ActionTypes } from "@/app/context/reducerActions/cartProducts";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ProductsBox = ({
  electronicProducts,
}: {
  electronicProducts: eletronicProducts[] | undefined;
}) => {
  const { dispatch, state } = useDashboard();
  const { push } = useRouter();

  const dispatchProducts = (prod: eletronicProducts) => {
    const isInCart = state.cartProducts.find((p) => p.id === prod.id);

    if (!isInCart)
      return dispatch({
        type: ActionTypes.SET_CART_PRODUCT,
        payload: { ...prod, quantity: 1 },
      });
  };

  return (
    <>
      {electronicProducts?.map((prod) => (
        <div
          key={prod.id}
          className="sm:w-[240px] w-[175px] flex flex-col gap-3 p-2 bg-white border-2 rounded-lg border-b-gray-light"
        >
          
          <Image
            alt="product image"
            src={prod.image_url[0] as string}
            width={200}
            height={150}
            className="h-[180px] w-auto cursor-pointer"
            onClick={() => push(prod.title.replace('/', '_'))}
          />
          <p
            aria-label="product description"
            className="text-black-medium font-semibold text-sm"
            id="product-title"
          >
            {prod.title}
          </p>
          <p
            aria-label="product price"
            className="text-black-medium font-bold text-lg"
          >
            ${prod.price}
          </p>
          <button
            aria-label="add product in the cart"
            className="w-full border rounded-xl bg-green-200 active:bg-green-50 active:transition-colors duration-1000 ease-in"
            onClick={() => dispatchProducts(prod)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </>
  );
};
