"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategorySliderSwiper from "./CategorySliderSwiper";
import CategorySliderSkeleton from "./../Skeleton/CategorySliderSkeleton";

const CategoriesSlider = () => {
  const [categories, setCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trendingCategories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (categories?.length > 0) {
      setNewCategories(categories);
    }
  }, [categories]);

  // const fetchCategory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trendingCategories`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  return (
    <div className="flex items-center justify-start  ">
      <div className="sm:pt-[1rem]  lg:pt-[20px] lg:pl-[52px] md:pl-[20px] pl-[12px]  overflow-x-auto  relative w-full">
        {newCategories?.length > 0 ? (
          <div className="flex flex-row group items-center justify-end gap-2 lg:mb-4">
            <CategorySliderSwiper categories={newCategories} />
          </div>
        ) : (
          <CategorySliderSkeleton />
        )}
      </div>
    </div>
  );
};

export default CategoriesSlider;
