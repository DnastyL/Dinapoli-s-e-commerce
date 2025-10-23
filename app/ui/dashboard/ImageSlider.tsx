"use client";
import { useCallback, useEffect, useState } from "react";
import "./image-slider.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import Apple from "@/public/apple-ecosystem-web-banner_1_.webp";
import PS5Pro from "@/public/playstation-5-pro-first-look_kxw4.600.webp";
import ArtBoard from "@/public/artboard_1-1.webp";
import GamingPc from "@/public/gaming pc advertisement.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CarouselType = {
  autoSlideInterval: number;
};

export const ImageSlider = ({ autoSlideInterval }: CarouselType) => {
  const imgs = [
    { id: 1, alt: "Apple", ...Apple },
    { id: 2, alt: "PS5 Pro", ...PS5Pro },
    { id: 3, alt: "Gaming Pc", ...GamingPc },
    { id: 4, alt: "Cellphone", ...ArtBoard },
  ];
  const [keyBoardCount, setKeyboardCount] = useState(0);  
  const [curr, setCurr] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const { push } = useRouter();

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

  function handleImageNavigation(query: string) {
    push(`/search-results?query=${query}&category=All`);
  }

  function handleNavigationThroughKeyboard(imgAlt: string, index: number) {
    setKeyboardCount((prevCount) => prevCount + 1);

    if(index == curr && keyBoardCount === 2) push(`/search-results?query=${imgAlt}&category=All`); // Case user pressed 3 times on the same button redicrect to product search page
    setCurr(index);
  }



  return (
    <section
      aria-label="Image Slider"
      className="w-[1152px] overflow-hidden relative"
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
      <button
        onClick={prev}
        className="absolute text-gray-dark inset-y-36 w-max h-max z-[999]"
        aria-label="View Previous Image"
      >
        <ChevronLeft aria-hidden size={40} />
      </button>
      <button
        onClick={next}
        className="text-gray-dark z-40 absolute inset-y-36 right-0 w-max h-max"
        aria-label="View Next Image"
      >
        <ChevronRight aria-hidden size={40} />
      </button>
      <div
        className="flex w-full transition-transform ease-out max-h-[300px] duration-500 cursor-pointer"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {imgs.map((i, index) => (
          <span
            key={i.id}
            className="w-full flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => handleImageNavigation(i.alt)}
          >
            <Image
              width={i.width}
              height={i.height}
              src={i.src}
              alt={i.alt}
              aria-hidden={curr !== index}
              className="w-full max-h-full object-contain"
            />
          </span>
        ))}
      </div>

      <div className="absolute bottom-[0.2rem] right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {imgs.map((image, i) => (
            <button
              key={i}
              onClick={() => handleNavigationThroughKeyboard(image.alt, i)}
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
