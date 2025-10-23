"use client";

import { useDashboard } from "@/app/hooks/useContext";
import { CustomSelect } from "./custom-select";
import { ActionTypes } from "@/app/context/reducerActions/cartProducts";
import { eletronicProducts } from "@/app/lib/definitions";
import { useState } from "react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

export const InfoCard = ({
  product,
  user,
}: {
  product: eletronicProducts;
  user: User | undefined;
}) => {
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useDashboard();
  const [quantity, setQuantity] = useState(1);
  const { push } = useRouter();
  async function handleCheckout() {
    if (!user) return push("/login");
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: [{ ...product, quantity }] }),
      });
      const data = await response.json();
      if (data?.url) {
        const checkoutUrl = data.url;
        setLoading(false);
        return push(checkoutUrl);
      }
    } catch (error) {
      throw new Error("Failed to create checkout session", error as Error);
    }
    setLoading(false);
  }

  function handleProductQuantity(value: number) {
    setQuantity(value);
  }

  function handleDispatchProduct() {
    if (state.cartProducts.find((cp) => cp.id === product.id)) return;
    dispatch({
      type: ActionTypes.SET_CART_PRODUCT,
      payload: {
        ...product,
        quantity,
      },
    });
  }
  return (
    <div className="flex flex-col gap-3 p-6">
      <CustomSelect
        setSelectedValue={handleProductQuantity}
        selectedValue={quantity}
      />
      <button
        type="button"
        className="rounded-xl bg-blue-gray-300 hover:bg-blue-gray-500 text-black disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleDispatchProduct}
      >
        Add to Cart
      </button>
      <button
        type="button"
        className="rounded-xl bg-light-blue-300 hover:bg-light-blue-500 text-black disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleCheckout}
      >
        Buy now
      </button>
    </div>
  );
};
