"use client";

import { useEffect, useRef, useState } from "react";
// import Card from "./card"
import Card from "./card";

const DataSliderSwiper = ({ productData, sliderIndex }) => {
  const swiperRef = useRef(null);


  useEffect(() => {
    const params = {
      centeredSlides: false,
      spaceBetween: 12,
      navigation: {
        nextEl: `.custom-next-button-${sliderIndex}`,
        prevEl: `.custom-prev-button-${sliderIndex}`,
      },
      noSwiping: false,
      allowSlidePrev: true,
      allowSlideNext: true,
      scrollbar: {
        el: `.swiper-scrollbar-custom-dataslider-${sliderIndex}`,
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
      allowSlideNext: true,
      allowSlidePrev: true,
      noSwiping: true,
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  return (
    <div>
      <swiper-container
        init="false"
        ref={swiperRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {
          productData.map((product) => (
            <swiper-slide key={product._id}>
              <div className="grid grid-cols-1 mt-2 h-full fade-in ">
                <Card
                  cardkey={product._id}
                  specialPrice={product?.specialprice}
                  title={product.productTitle}
                  price={product.perUnitPrice}
                  desc={product.subcategory}
                  productId={product.productId}
                  demandtype={product.demandtype}
                  imgSrc={product.images}
                  rating={product.ratings}
                  id={product._id}
                  cssClass={"card1flex"}
                  productImages={product?.productImages}
                  productType={product.productType}
                  expectedDelivery={product.expectedDelivery}
                  discountedprice={product.discountedprice}
                  shortDescription={product.shortDescription}
                  offer={product.offer}
                  unitType={product.unitType}
                  urgency={product.urgency}
                />
              </div>
            </swiper-slide>
          ))
        }
      </swiper-container>
      <div
        className={`swiper-scrollbar-custom-dataslider-${sliderIndex} h-[2px]`}
      ></div>
    </div>
  );
};

export default DataSliderSwiper;
