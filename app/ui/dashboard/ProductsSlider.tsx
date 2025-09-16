"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import clsx from "clsx";
import { IconButton } from "@material-tailwind/react";
import { ProductsBox } from "./products-box";
import { eletronicProducts } from "@/app/lib/definitions";

export function ProductsSlider({
  electronicProducts,
}: {
  electronicProducts: eletronicProducts[] | undefined;
}) {
  const carousel = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [axis, setAxis] = useState(0);
  const [showChevron, setShowChevron] = useState(false);

  const prev = () => {
    if (axis == 0) {
      return setAxis(carouselWidth);
    }

    setAxis((axis) => (axis === carouselWidth / 2 ? 0 : axis / 2));
  };

  const next = () => {
    if (axis < carouselWidth) {
      setAxis((axis) =>
        axis == carouselWidth / 2 ? axis * 2 : carouselWidth / 2
      );
    }
    if (axis == carouselWidth) {
      setAxis(0);
    }
  };

  useEffect(() => {
    if (carousel.current)
      setCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
      );
  }, [carousel.current?.offsetWidth]);

  return (
    <>
      <div
        aria-label="New products on Di Napoli - Carousel"
        className="relative w-full"
        onMouseEnter={() => setShowChevron(true)}
        onMouseLeave={() => setShowChevron(false)}
        ref={carousel}
      >
        {/* <div
          className={clsx(
            "absolute z-50 h-[220px] inset-0 flex items-center justify-between p-6 transition-all duration-300",
            { "opacity-0": !showChevron, invisible: !showChevron },
            { "opacity-100": showChevron, visible: showChevron }
          )}
        > */}
        <IconButton
          aria-label="roll carousel to the right"
          type="button"
          onClick={prev}
          color="green"
          className={clsx(
            "relative inset-y-36 inset-x-6 transition-all duration-300 w-[30px] h-[30px] rounded-full text-gray-dark z-40",
            {
              "opacity-0": !showChevron,
              invisible: !showChevron,
            },
            {
              "opacity-100": showChevron,
              visible: showChevron,
            }
          )}
        >
          <ChevronLeft size={30} />
        </IconButton>
        <IconButton
          aria-label="roll carousel to the left"
          type="button"
          color="green"
          onClick={next}
          className={clsx(
            "relative inset-y-36 inset-x-[90%] transition-all duration-300 w-[30px] h-[30px] rounded-full text-gray-dark z-40",
            {
              "opacity-0": !showChevron,
              invisible: !showChevron,
            },
            {
              "opacity-100": showChevron,
              visible: showChevron,
            }
          )}
        >
          <ChevronRight size={30} />
        </IconButton>
        {/* </div> */}
        <div
          className="w-max px-6 flex gap-3 transition-transform"
          style={{ transform: `translateX(-${axis}px)` }}
        >
          <ProductsBox electronicProducts={electronicProducts} />
        </div>
      </div>
    </>
  );
}
