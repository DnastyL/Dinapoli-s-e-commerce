"use client";
import { useCallback, useEffect, useState } from "react";
import "./image-slider.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import Apple from "@/public/apple-ecosystem-web-banner_1_.webp";
import PS5Pro from "@/public/playstation-5-pro-first-look_kxw4.600.webp";
import ArtBoard from "@/public/artboard_1-1.webp";
import GamingPc from "@/public/gaming pc advertisement.jpg";
import Image from "next/image";

type CarouselType = {
  autoSlideInterval: number;
};

export const ImageSlider = ({ autoSlideInterval }: CarouselType) => {
  const imgs = [
    { id: 1, alt: "Apple Products", ...Apple },
    { id: 2, alt: "PS5Pro", ...PS5Pro },
    { id: 3, alt: "GamingPc", ...GamingPc },
    { id: 4, alt: "ArtBoardProducts", ...ArtBoard },
  ];
  const [curr, setCurr] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? imgs.length - 1 : curr - 1));

  const next = useCallback(
    () => setCurr((curr) => (curr === imgs.length - 1 ? 0 : curr + 1)),
    [imgs.length]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <section
      aria-label="Image Slider"
      className="w-[1152px] overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
      onFocus={() => setAutoSlide(false)}
      onBlur={() => setAutoSlide(true)}
    >
      <a
        id="link-to-skip-images"
        href="#after-image-slider"
        className="absolute w-[1px] 
      h-[1px] p-0 m-[-1px] overflow-hidden 
      border-[0px] "
      >
        Skip Image Slider Controls
      </a>
      <div
        className="flex  transition-transform ease-out max-h-[300px] duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {[
          ...imgs.map((i, index) => (
            <div key={i.id} className="w-full flex-shrink-0 flex items-center ">
              <Image
                width={i.width}
                height={i.height}
                key={i.id}
                src={i.src}
                alt={i.alt}
                aria-hidden={curr !== index}
                className="w-full max-h-full object-contain"
              />
            </div>
          )),
        ]}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className=" text-gray-dark"
          aria-label="View Previous Image"
        >
          <ChevronLeft aria-hidden size={40} />
        </button>
        <button
          onClick={next}
          className="text-gray-dark"
          aria-label="View Next Image"
        >
          <ChevronRight aria-hidden size={40} />
        </button>
      </div>

      <div className="absolute bottom-[0.2rem] right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurr(i)}
              aria-label={`View Image ${i + 1}`}
              className={`transition-all focus-visible:outline-10 focus-visible:outline-green-800 cursor-pointer w-2 h-2 bg-black rounded-full ${
                curr === i ? "p-2" : "bg-opacaity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
