"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";

const MainSlider = ({ sliderData }) => {
  const [maxHeight, setMaxHeight] = useState("70vh");
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // State for screen size
  const router = useRouter();

  const handleTab = () => router.push("/room");

  const handleResize = () => {
    setMaxHeight(window.innerWidth <= 600 ? "470px" : "70vh");
    setIsDesktop(window.innerWidth >= 600); // Update screen size state
  };

  useEffect(() => {
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full h-[70vh] max-h-[546px] sm:mt-[96px] px-[12px] sm:px-0 sticky top-0 z-10"
      style={{ maxHeight }}
    >
      {/* Navigation Buttons */}
      {["prev", "next"].map((direction) => (
        <div
          key={direction}
          role="button"
          aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
          tabIndex={0}
          className={`${
            isHovering ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } transition absolute nav-${direction} ${
            direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4"
          } top-1/2 -translate-y-1/2 z-30 cursor-pointer rounded-full hidden sm:flex items-center justify-center p-1`}
        >
          <Image
            src="/icons/rightarro-white.svg"
            width={37}
            height={37}
            alt={`${direction} arrow`}
            className={`transform transition-transform hover:scale-105 ${
              direction === "prev" ? "rotate-180" : ""
            }`}
          />
        </div>
      ))}

      {/* Swiper Component */}
      <Swiper
        // modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".nav-next",
          prevEl: ".nav-prev",
        }}
        loop
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        centeredSlides
        spaceBetween={10}
        breakpoints={{
          350: { slidesPerView: 1 },
          640: { slidesPerView: 1.25 },
          1024: { slidesPerView: 1.08 },
        }}
        className="w-full h-full"
      >
        {sliderData?.map((data, index) => (
          <SwiperSlide key={index} style={{
            gap: "0px",
            opacity: "0.3",
            transition: "opacity 0.5s ease"
          }}>
            <Link href={data.link || "#"}>
              <Image
                src={isDesktop ? data.desktopImgSrc : data.mobileImgSrc} // Use state to determine image source
                alt="slider"
                fill
                priority
                className="transition-opacity duration-500"
              />
            </Link>
            {data.circles?.[0]?.productTitle && (
              <div
                className="absolute flex items-center justify-center w-full h-full"
                style={{
                  top: `${data.circles[0].topPosition}%`,
                  left: `${data.circles[0].leftPosition}%`,
                }}
              >
                <Link
                  className="p-2 bg-white shadow-lg drop-shadow-2xl"
                  href={data.circles[0].productLink}
                >
                  <h2 className="font-semibold">{data.circles[0].productTitle}</h2>
                  <p>{data.circles[0].productCategory}</p>
                  <p className="flex items-center gap-1 text-2xl mt-1">
                    <sub className="text-sm font-bold">₹</sub>
                    {data.circles[0].productPrice}
                  </p>
                </Link>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
