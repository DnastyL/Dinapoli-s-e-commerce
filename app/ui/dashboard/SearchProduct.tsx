"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const SearchProduct = ({}) => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [categorySelected, setCategorySelected] = useState('All')
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathName = usePathname();


  const handleSearch = (inputQuery: string | undefined) => {
    return inputQuery ? setQuery(inputQuery.trim()) : setQuery(undefined);
  };

  const handleQuery = () => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
      params.set("category", categorySelected.trim())
      if (pathName === "/dashboard") {
        push(`${pathName}/search-results?${params.toString()}`);
      } else {
        replace(`${pathName}?${params.toString()}`);
      }
    } else {
      params.delete("query");
      params.delete("category")
    }
  };


  return (
    <>
      <div
        className="w-full flex items-center"
        aria-disabled={false}
        aria-label="Search Bar"
      >
        <label htmlFor="selectDepartment" className="hidden">
          Select the department you want to search in
        </label>
        <select
          id="selectDepartment"
          aria-describedby="categories"
          aria-label="categories"
          onChange={(e) => setCategorySelected(e.target.value)}
          className="sm:block hidden w-40 peer cursor-pointer rounded-l-md border-gray py-2 text-sm outline-2 bg-[#E6E6E6] hover:bg-[#dadada] focus:bg-[#dadada] placeholder:text-black text-black"
        >
          <option value="All Items">All</option>
          <option value="Electronics">Electronics</option>
        </select>
        <input
          type="text"
          placeholder="Search for products"
          className="w-full border-gray rounded-md sm:rounded-none sm:rounded-r-md p-[0.344rem] focus:outline-black text-black"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDownCapture={(e) => e.key === "Enter" && handleQuery()}
        />
        <span className="relative right-12 h-full flex items-center rounded-r-md cursor-pointer">
          <IconButton
            aria-label="Search product..."
            variant="text"
            className="rounded-3xl"
            onClick={handleQuery}
          >
            <MagnifyingGlassIcon width={40} height={30} color="black" />
          </IconButton>
        </span>
      </div>
    </>
  );
};
