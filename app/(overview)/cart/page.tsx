import { fetchElectronicProducts } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { CartProductBox } from "@/app/ui/cartPageComponents/cart-product-box";
import { auth } from "@/auth";

export default async function CartPage() {
  const eletronicProducts = await fetchElectronicProducts();
  const session = await auth();
  const randomNumber = () => {
    return Math.floor(Math.random() * (5 - 3) + 3);
  };

  const user = session?.user as User | undefined;

  return (
    <section className="min-h-[814px] w-full">
      <CartProductBox
        electronicProducts={eletronicProducts}
        randomNumber={randomNumber()}
        user={user}
      />
    </section>
  );
}
