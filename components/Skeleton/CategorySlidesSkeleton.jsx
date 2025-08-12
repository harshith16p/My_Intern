"use client";

import { useEffect, useRef } from "react";
import CategorySlideSkeleton from "./CategorySlideSkeleton";
function CategorySlidesSkeleton() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 12,
      navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
      },
      noSwiping: false,
      allowSlidePrev: true,
      allowSlideNext: true,
      scrollbar: {
        el: ".swiper-scrollbar-custom",
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: false,
        sticky: true,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounceRatio: 0.5,
      },
      breakpoints: {
        300: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);
  return (
    <div className="w-full h-[700px] mt-[64px] px-[12px] sm:px-[20px]  md:px-[52px]">
      <swiper-container
        init="false"
        ref={swiperRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <swiper-slide
          style={{
            marginLeft: "0px",
          }}
        >
          <div className="grid grid-cols-1 w-full h-full fade-in">
          <CategorySlideSkeleton />
          </div>
        </swiper-slide>
        <swiper-slide
          style={{
            marginLeft: "0px",
          }}
        >
          <div className="grid grid-cols-1 w-full h-full fade-in">
          <CategorySlideSkeleton />
          </div>
        </swiper-slide>
        <swiper-slide
          style={{
            marginLeft: "0px",
          }}
        >
          <div className="grid grid-cols-1 w-full h-full fade-in">
          <CategorySlideSkeleton />
          </div>
        </swiper-slide>
        <swiper-slide
          style={{
            marginLeft: "0px",
          }}
        >
          <div className="grid grid-cols-1 w-full h-full fade-in">
            <CategorySlideSkeleton />
          </div>
        </swiper-slide>
      </swiper-container>
      <div className="swiper-scrollbar-custom h-[2px]"></div>
    </div>
  );
}

export default CategorySlidesSkeleton;
