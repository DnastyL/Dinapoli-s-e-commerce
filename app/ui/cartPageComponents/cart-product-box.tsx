"use client";
import { ActionTypes } from "@/app/context/reducerActions/cartProducts";
import { useDashboard } from "@/app/hooks/useContext";
import { useDebounce } from "@/app/hooks/useDebounce";
import { eletronicProducts, User } from "@/app/lib/definitions";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { Rating } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type cartProductsType = {
  electronicProducts: eletronicProducts[] | undefined;
  randomNumber: number;
  user: User | undefined;
};

export const CartProductBox = ({
  electronicProducts,
  randomNumber,
  user,
}: cartProductsType) => {
  const { state, dispatch } = useDashboard();
  const [subTotal, setSubTotal] = useState(0);
  const [amountInCart, setAmountInCart] = useState(0);
  const { push } = useRouter();

  const handleCheckout = () => {
    if (!user) return push(`/login`);
  };

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
      state.cartProducts.reduce(
        (accumulador, currentVal) =>
          accumulador + currentVal.quantity * currentVal.price,
        0
      )
    );
  };
  const subTotalDebounced = useDebounce(total, 700);

  const howManyItemsInCart = () => {
    setAmountInCart(
      state.cartProducts.reduce(
        (accumulador, currentVal) => accumulador + currentVal.quantity,
        0
      )
    );
  };
  const subQuantity = useDebounce(howManyItemsInCart, 700);

  const dispatchProductToCart = (prod: eletronicProducts) => {
    const isInCart = state.cartProducts.find((p) => p.id === prod.id);

    if (!isInCart) {
      dispatch({
        payload: { ...prod, quantity: 1 },
        type: ActionTypes.SET_CART_PRODUCT,
      });
    }
  };

  useEffect(() => {
    subTotalDebounced();
    subQuantity();
  }, [state.cartProducts.length, subTotalDebounced, subQuantity]);

  console.log(amountInCart);
  return (
    <>
      <div className="flex justify-evenly md:flex-row flex-col-reverse md:gap-3 gap-9 w-full pt-8 pl-4 md:pl-0">
        <div className="flex flex-col gap-3">
          <div className="bg-white lgg:w-[1032px]">
            <h1 className="text-black-medium text-2xl md:w-[1000px] font-semibold mx-4 p-4 border-b border-[#ccc]">
              Shopping Cart
            </h1>
            {state.cartProducts.map((p) => (
              <div key={p.id} className="px-4 md:h-56">
                <div className="flex pl-4 pt-5 md:flex-row flex-col gap-5 border-b border-[#ccc] h-full">
                  <Image
                    alt={p.description}
                    src={p.image_url}
                    height={180}
                    width={180}
                    className="h-[180px]"
                  />
                  <div className="flex flex-col sm:w-[720px] gap-3 pb-7">
                    <p className="text-black-medium whitespace-normal max-w-full break-normal font-semibold leading-5">
                      {p.title}
                    </p>
                    <p className="text-xs text-green-100 font-semibold">
                      In Stock
                    </p>
                    <div className="flex gap-5 w-max overflow-hidden items-center border-2 solid rounded-lg border-green-200">
                      <span className="flex relative">
                        <TrashIcon
                          color="black"
                          aria-label="Remove the item from your cart"
                          width={22}
                          height={22}
                          className="hover:cursor-pointer w-[22px] absolute right-5 transition-transform duration-700"
                          style={{
                            transform:
                              p.quantity > 1
                                ? `translateX(0px)`
                                : `translateX(20px)`,
                          }} //25px
                          onClick={() =>
                            dispatch({
                              payload: p.id,
                              type: ActionTypes.REMOVE_CART_PRODUCT,
                            })
                          }
                        />
                        <MinusIcon
                          color="black"
                          aria-label="Decrease the amount"
                          width={22}
                          height={22}
                          className="hover:cursor-pointer w-[22px] transition-transform duration-500"
                          style={{
                            transform:
                              p.quantity == 1
                                ? `translateX(-25px)`
                                : `translateX(0px)`,
                          }} //0px
                          onClick={() => {
                            handleQuantity(p, false),
                              subTotalDebounced(),
                              subQuantity();
                          }}
                        />
                      </span>

                      <p className="text-black-medium font-bold">
                        {p.quantity}
                      </p>
                      <PlusIcon
                        color="black"
                        aria-label="Increase amount"
                        width={22}
                        height={22}
                        className="hover:cursor-pointer"
                        onClick={() => {
                          handleQuantity(p, true),
                            subTotalDebounced(),
                            subQuantity();
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-black-medium text-lg font-bold">
                    ${p.price}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-end items-center py-3 pr-6">
              <p className="text-black-medium text-lg">
                Subtotal ({amountInCart}):{" "}
                <span className="text-black-medium font-semibold">
                  ${subTotal}
                </span>
              </p>
            </div>
          </div>
          <div className="lgg:w-[1032px] h-12 bg-white" />
        </div>

        <aside className="flex gap-12 flex-col">
          {!!state.cartProducts.length && (
            <div className="bg-white w-80 h-32 flex flex-col gap-11">
              <div className="bg-white w-64 h-32">
                <div className="p-4">
                  <p className="text-black-medium text-lg">
                    Subtotal ({amountInCart}):{" "}
                    <span className="text-black-medium font-semibold">
                      ${subTotal}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="ml-7 h-7 w-64 rounded-xl bg-green-100 text-black-medium text-sm text-center"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          <div className="w-80 bg-white">
            <p className="text-black-medium text-lg font-semibold p-3">
              Features you may like
            </p>
            {electronicProducts?.map((p) => (
              <div key={p.id} className="w-full p-3 flex gap-5">
                <Image
                  width={100}
                  height={100}
                  alt={p.title}
                  src={p.image_url}
                  className="h-[100px] w-[100px]"
                />
                <div className="flex py-2 flex-col gap-1">
                  <h2 className="text-xs w-28 text-cyan-600 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {p.title}
                  </h2>
                  <Rating
                    value={randomNumber}
                    readonly
                    ratedColor="light-blue"
                    unratedColor="light-blue"
                  />
                  <p className="text-red-500 text-sm font-semibold">
                    ${p.price}
                  </p>
                  <button
                    type="button"
                    className="h-4 w-20 rounded-xl bg-green-100 text-black-medium text-xs"
                    onClick={() => dispatchProductToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
};
