import { ActionTypes } from "@/app/context/reducerActions/cartProducts";
import { useDashboard } from "@/app/hooks/useContext";
import { useDebounce } from "@/app/hooks/useDebounce";
import { eletronicProducts } from "@/app/lib/definitions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CartModal = () => {
  const { state, dispatch, handleModal } = useDashboard();
  const { cartProducts } = state;
  const [subTotal, setSubTotal] = useState(0);

  const handleQuantity = (
    prod: eletronicProducts,
    increaseQuantity: boolean
  ) => {
    const { quantity } = prod;

    if (increaseQuantity && quantity < 10) {
      return dispatch({
        payload: { ...prod, quantity: quantity + 1 },
        type: ActionTypes.HANDLE_QUANTITY,
      });
    }
    if (quantity > 1 && !increaseQuantity)
      dispatch({
        payload: { ...prod, quantity: quantity - 1 },
        type: ActionTypes.HANDLE_QUANTITY,
      });
  };

  const total = () => {
    setSubTotal(
      cartProducts.reduce(
        (accumulador, currentVal) =>
          accumulador + currentVal.quantity * currentVal.price,
        0
      )
    );
  };

  const subTotalDebounced = useDebounce(total, 1000);

  useEffect(() => {
    subTotalDebounced();
  }, [cartProducts.length, subTotalDebounced]);

  return (
    <>
      <div
        className="bg-white md:w-[460px] h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex w-full justify-end p-4">
          <button
            type="button"
            aria-label="close modal"
            onClick={() => handleModal(true)}
          >
            <XMarkIcon width={30} height={26} color="black" />
          </button>
        </span>
        <div className="flex justify-between items-center p-4 border-b border-blue-gray-100">
          <div>
            <h1 className="text-black font-bold text-2xl">
              Your shopping cart
            </h1>
            {cartProducts.length && (
              <h2 className="text-black font-semibold">
                {cartProducts.length > 1
                  ? `You have ${cartProducts.length} items`
                  : `You have ${cartProducts.length} item`}
              </h2>
            )}
            {!cartProducts.length && (
              <h2 className="text-black font-semibold">
                Jump back and do more shopping :)
              </h2>
            )}
          </div>
          <Button
            variant="outlined"
            color="green"
            size="sm"
            className="rounded-full focus:ring-0 h-9 w-32"
          >
            Go to Cart
          </Button>
        </div>

        <div className="overflow-y-auto h-2/3">
          {cartProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex gap-3 w-full h-52 px-4 items-center border-b border-blue-gray-100"
            >
              <Image
                alt="product-image"
                src={prod.image}
                width={200}
                height={150}
                className="h-[150px] w-[150px] aspect-square"
              />
              <div className="flex flex-col justify-around w-full h-full">
                <div className="flex justify-between items-end">
                  <p className="text-black font-semibold text-sm">
                    {prod.title}
                  </p>
                  <p className="text-black font-bold text-lg">${prod.price}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-black font-semibold text-sm">Quantity:</p>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        aria-label="decrease quantity"
                        type="button"
                        className="bg-blue-gray-100/60 rounded-md active:bg-blue-gray-100/80"
                        onClick={() => {
                          handleQuantity(prod, false), subTotalDebounced();
                        }}
                      >
                        <MinusIcon color="green" width={30} height={30} />
                      </button>
                      <p className="text-blue-gray-500 text-sm font-semibold">
                        {prod.quantity}
                      </p>
                      <button
                        aria-label="increase quantity"
                        type="button"
                        className="bg-blue-gray-100/60 rounded-md active:bg-blue-gray-100/80"
                        onClick={() => {
                          handleQuantity(prod, true), subTotalDebounced();
                        }}
                      >
                        <PlusIcon color="green" width={30} height={30} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() =>
                        dispatch({
                          payload: prod.id,
                          type: ActionTypes.REMOVE_CART_PRODUCT,
                        })
                      }
                    >
                      <TrashIcon color="green" width={30} height={30} />{" "}
                      <p className="font-semibold text-sm text-blue-gray-400">
                        Delete
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="p-4 text-black font-semibold text-xl">
          {subTotal ? `Subtotal: ${subTotal}$` : ""}
        </p>
      </div>
    </>
  );
};
