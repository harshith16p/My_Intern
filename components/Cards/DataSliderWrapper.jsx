"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  selectRecommendationCategoryWiseStatus,
  selectRecommendedCategoryWiseProduct,
} from "../Features/Slices/recommendationCategoryWiseSlice";
import Dataslider from "./Dataslider";
import CategorySlidesSkeleton from "../Skeleton/CategorySlidesSkeleton";

const PAGE_THRESHOLD_MIN = 74;
const PAGE_THRESHOLD_MAX = 77;

const DataSliderWrapper = ({
  sliderIndexOffset = 0,
  sliderIndexStart = 0,
  sliderIndexEnd = 2,
}) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const recommended = useSelector(selectRecommendedCategoryWiseProduct);
  const recommendedStatus = useSelector(selectRecommendationCategoryWiseStatus);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    if (
      recommendedStatus === "idle"
    ) {
      dispatch({ type: "RECOMMENDATION_CATEGORYWISE_REQUEST", payload: { categoryLimit: 3, productLimit: 10 } });
    }
  }, [dispatch]);

  // const filteredData = useMemo(() => {
  //   if (recommended?.recommendations?.recommendedProducts) {
  //     return recommended.recommendations.recommendedProducts.reduce((acc, item) => {
  //       acc[item.category] = acc[item.category]
  //         ? [...acc[item.category], item]
  //         : [item];
  //       return acc;
  //     }, {});
  //   }
  //   return {};
  // }, [recommended]);

  // console.log("filteredData", filteredData);

  // const categories =
  //   recommended?.recommendations?.recommendedProducts?.map((item) => item.category) || [];
  // const uniqueCategories = [...new Set(categories)];

  // const filteredData = recommended?.recommendations?.recommendedProducts || {};
  // let uniqueCategories = [];
  // uniqueCategories = Object.keys(filteredData).forEach(category => {
  //   console.log(category);
  //   return category;
  // });

  useEffect(() => {
    if (recommended) {
      setFilteredData(recommended);
      setUniqueCategories(
        Object.keys(recommended)
      );
    }
  }, [recommended]);
  // useEffect(() => {
  //   if (recommended?.recommendations?.categories) {
  //     setFilteredData(recommended.recommendations.categories);
  //     setUniqueCategories(
  //       Object.keys(recommended.recommendations.categories)
  //     );
  //   }
  // }, [recommended]);

  const datasliderRefs = useRef([]);
  useEffect(() => {
    datasliderRefs.current = uniqueCategories.map(() => createRef());
  }, [uniqueCategories]);

  // const handleScroll = useCallback(
  //   throttle(() => {
  //     const firstPageHeight = window.innerHeight;
  //     const currentScrollPosition = document.documentElement.scrollTop;

  //     if (currentScrollPosition + window.innerHeight >= firstPageHeight) {
  //       setPage((prev) => prev + 1);
  //     }
  //   }, 300),
  //   []
  // );

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  // if (!uniqueCategories.length) {
  //   return <CategorySlidesSkeleton />;
  // }

  return (
    <>
        {/* .slice(sliderIndexStart, sliderIndexEnd) */}
      {uniqueCategories.length > 0 ? uniqueCategories
        .map((item, index) => {
          return (
            <div key={item}>
            <Dataslider
              category={item}
              sliderIndex={index + sliderIndexOffset}
              data={filteredData[item] || []}
              ref={datasliderRefs.current[index + sliderIndexStart]}
            />
          </div>
          );
        }) : <>
        <CategorySlidesSkeleton />
        <CategorySlidesSkeleton />
        <CategorySlidesSkeleton />

        </>}
    </>
  );
};

export default DataSliderWrapper;

