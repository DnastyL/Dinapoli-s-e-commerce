import { fetchFilteredEletronics } from "@/app/lib/data";
import { InfoCard } from "@/app/ui/productPageComponents/InfoCard";
import { RatingComponent } from "@/app/ui/rating";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ productName: string }>;
}) {
  const { productName } = await params;
  const decodingProduct = decodeURIComponent(productName);
  const product = await fetchFilteredEletronics(decodingProduct);
  const session = await auth();
  const pDescriptionSplit = product?.[0].description.split(/[;]/);


  function randomNumber() {
    let res = Math.floor(Math.random() * 6);
    return res < 2 ? 3 : res;
  }
  const randN = randomNumber();

  return (
    <div className="overflow-auto">
      <section className="w-full  md:border-y border-blue-gray-200 mt-8">
        {product?.map((p) => (
          <div key={p.id} className="flex py-8 gap-3 flex-wrap justify-around">
            <div key={p.id} className="text-black flex flex-wrap px-20 gap-6 ">
              <Image
                alt={p.title}
                src={p.image_url}
                width={400}
                height={300}
                className="h-[300px] pt-2"
              />
              <div>
                <div className="border-b border-blue-gray-200 max-h-max">
                  <h2
                    aria-label="product-name"
                    className="font-semibold max-w-[500px] text-lg text-brown-400 break-words"
                  >
                    {p.title}
                  </h2>
                  <div className="flex gap-1">
                    <p
                      aria-label="product-rating"
                      className="text-lg font-semibold"
                    >
                      {randN}
                      {randN == 5 ? "" : `,${randN + 2}`}
                    </p>
                    <RatingComponent color="light-blue" rating={randN} />
                  </div>
                  <span
                    aria-label="number-in-sales"
                    className="bg-blue block text-center text-brown-100 text-xs font-semibold rounded h-4 w-24 mt-2"
                  >
                    {randN}º in sales
                  </span>
                  <p className="font-semibold text-xs pt-2">
                    More than 200{" "}
                    <span className="text-xs font-normal">
                      purchases last month
                    </span>
                  </p>
                </div>
                <div className="py-3 border-b border-blue-gray-200">
                  <span className="bg-[#131921] text-center text-brown-100 text-sm font-semibold max-w-24 h-8 p-1 rounded">
                    Limited Offer
                  </span>
                  <p className="text-[#131921] font-bold mt-3 text-2xl">
                    {p.price}
                  </p>
                </div>
                <div className="mt-2">
                  <h2 className="text-[#131921] mb-3 font-bold">
                    About this item
                  </h2>
                  <ul className="list-disc max-w-[550px] pl-4">
                    {pDescriptionSplit?.map((d) => (
                      <li
                        key={d}
                        className="max-w-[500px] text-sm mt-1 break-words"
                      >
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded border-blue-gray-200 w-[240px] h-[450px]">
              <h2
                aria-label="product-price"
                className="text-[#131921] font-normal text-2xl p-6"
              >
                <span className="relative text-xs -top-3">$</span>
                {p.price}
              </h2>
              <h3 className="text-blue font-semibold text-lg pl-6">In Stock</h3>
              <InfoCard product={product[0]} user={session?.user} />
              <div className="flex flex-col gap-2 items-center">
                <span className="flex gap-3 w-[183px] items-center">
                  {" "}
                  <p className="text-xs text-gray-dark">Ships from</p>{" "}
                  <p className="text-xs text-black-medium font-semibold w-24">
                    Di Napoli
                  </p>
                </span>

                <span className="flex gap-3 w-[183px]  items-center ">
                  {" "}
                  <p className="text-xs text-gray-dark w-[61px]">Sold by</p>
                  <p className="text-xs text-black-medium font-semibold w-24">
                    Di Napoli
                  </p>
                </span>
                <span className="flex gap-3 w-[183px] ">
                  <p className="text-xs text-gray-dark w-[61px]">Returns </p>{" "}
                  <p className="text-xs text-black-medium font-semibold break-words text-wrap max-w-24">
                    30-day refund / replacement
                  </p>
                </span>
                <span className="flex gap-3 w-[183px] ">
                  <p className="text-xs text-gray-dark w-[61px]">Payment </p>{" "}
                  <p className="text-xs text-black-medium font-semibold break-words text-wrap">
                    Secure transaction
                  </p>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
