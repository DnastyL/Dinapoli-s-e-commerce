import {
  fetchFilteredEletronics,
  fetchElectronicProducts,
} from "@/app/lib/data";
import { ProductsBox } from "@/app/ui/dashboard/products-box";
import Link from "next/link";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

export default async function SearchResults({
  searchParams,
}: {
  searchParams: {
    query: string;
    category: string;
  };
}) {
  const electronicsFiltered = await fetchFilteredEletronics(searchParams.query);
  const allElectronics = await fetchElectronicProducts();

  return (
    <main className="sm:h-full h-[814px] w-full overflow-y-auto overflow-x-hidden">
      {!electronicsFiltered?.length ? (
        <>
          <div className="max-w-[900px] px-2 sm:m-auto py-2">
            <h1
              className={`${poppins.variable} font-poppins text-black-medium`}
            >
              Products not found with search term{" "}
              <strong>{searchParams.query}</strong>
            </h1>
            <h2
              className={`${poppins.variable} font-poppins text-black-medium`}
            >
              Return to{" "}
              <Link
                href="/"
                className="text-green-400 hover:text-green-400/50"
              >
                dashboard
              </Link>
            </h2>
            <h3 className="mt-2 text-black-medium font-medium text-sm">
              Or check out these items instead.
            </h3>
          </div>

          <div className="max-w-[900px] w-full px-2 sm:m-auto pt-2">
            <h2 className="font-semibold text-xl text-black-medium">
              Top Deals
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 pt-6">
              <ProductsBox electronicProducts={allElectronics} />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-medium pt-3 max-w-[650px] sm:m-auto text-black-medium">
            {searchParams.category}
          </h2>
          <div className="max-w-[900px] w-full flex flex-wrap justify-center items-center gap-2 sm:gap-4 py-8  sm:m-auto">
            <ProductsBox electronicProducts={electronicsFiltered} />
          </div>
        </>
      )}
    </main>
  );
}
