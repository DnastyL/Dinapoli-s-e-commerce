import { fetchElectronicProducts } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { CartProductBox } from "@/app/ui/cartPageComponents/cart-product-box";
import { auth } from "@/auth";

export default async function CartPage() {
  const {electronicProducts} = await fetchElectronicProducts();
  const session = await auth();
 

  const user = session?.user as User | undefined;

  return (
    <section className="min-h-[814px] w-full">
      <CartProductBox
        electronicProducts={electronicProducts?.slice(6)}
        user={user}
      />
    </section>
  );
}
