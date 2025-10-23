"use server";

import { ImageSlider } from "../ui/dashboard/ImageSlider";
import { ProductsSlider } from "../ui/dashboard/ProductsSlider";
import { fetchElectronicProducts } from "@/app/lib/data";

export default async function Dashboard() {
  const { electronicProducts, cellPhones, gamingPcs } =
    await fetchElectronicProducts();

  return (
    <main className="pt-20 h-full flex-grow overflow-auto">
      <div className="flex items-center justify-center pb-3">
        <ImageSlider autoSlideInterval={3000} />
      </div>
      <section id="after-image-slider">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-5 max-w-[1152px] overflow-hidden">
            <h2 className="font-bold font-sans text-xl text-black-medium">
              New on Di Napoli
            </h2>
            <ProductsSlider
              electronicProducts={electronicProducts?.slice(0, 6)} showCategory={false} 
            />

            <ProductsSlider electronicProducts={cellPhones} />

            <ProductsSlider electronicProducts={gamingPcs} />
          </div>
        </div>
      </section>
    </main>
  );
}
