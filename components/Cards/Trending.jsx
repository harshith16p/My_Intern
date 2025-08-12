"use client";
import React, {useEffect, useState } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { selectTrendingData } from "../Features/Slices/trendingSlice";
import { selecteddbItems } from "../Features/Slices/cartSlice";
import TrendingSlider from "./TrendingSlider";
// import dynamic from "next/dynamic";
// const TrendingSlider = dynamic(() => import("./TrendingSlider"));

import CardsSkeleton from "./CardsSkeleton";

const Trending = () => {
  const [newTrendingData, setNewTrendingData] = useState([]);
  const trendingData = useSelector(selectTrendingData);
  const dispatch = useDispatch();
  const cartData = useSelector(selecteddbItems);
  // const [TrendingData, setTrendingData] = useState([]);
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
  // }, []);

  // useEffect(() => {
  //   if (trendingData.length === 0) {
  //     dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
  //   }
  //   if (trendingData) {
  //     setNewTrendingData(trendingData);
  //   }
  // }, [trendingData]);

  // useEffect(() => {
  //   const trendindData = newTrendingData.filter(
  //     (item) => item.subcategory !== "Accessories"
  //   );
  //   console.log(trendindData);
  //   if (trendindData.length > 0) {
  //     setTrendingData(trendindData);
  //   }
  // }, [newTrendingData]);

  // Fetch data whenever `page` updates
  useEffect(() => {
    // if (page > 3 && page < 15) {
    dispatch({ type: "FETCH_TRENDING_DATA", payload: "trending" });
    // }
  }, [dispatch]);

  useEffect(() => {
    // Update newTrendingData whenever trendingData changes
    if (trendingData) {
      setNewTrendingData((prevData) => [...prevData, ...trendingData]);
    }
  }, [trendingData]);

  // const handleScroll = useCallback(() => {
  //   const firstPageHeight = window.innerHeight; // Get the height of the first viewport
  //   const currentScrollPosition = document.documentElement.scrollTop; // Current scroll position

  //   if (currentScrollPosition + window.innerHeight >= firstPageHeight) {
  //     setPage((prev) => prev + 1); // Increment page number
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  const isProductInCart = (productId) => {
    return cartData?.items?.some(
      (cartItem) => cartItem?.productId?._id === productId
    );
  };

  return (
    <div>
      <div className="mb-20 bg-white ml-[12px] sm:ml-[20px] md:ml-[0px] md:px-[52px]  ">
        <div className="mb-2 w-full flex justify-between items-center">
          <h2 className="Blinds font-semibold text-2xl pb-[20px] lg:pt-[60px]">
            Most Family Choice
          </h2>
        </div>
        {newTrendingData?.length > 0 ? (
          <TrendingSlider
            trendingData={newTrendingData}
            isProductInCart={isProductInCart}
          />
        ) : (
          <div className="flex">
            <CardsSkeleton />
          </div>
        )}
        {/*  */}
        <div className="swiper-scrollbar-custom h-[2px]"></div>
      </div>
    </div>
  );
};

export default Trending;
