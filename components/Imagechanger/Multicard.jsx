"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMultiCardData } from "../Features/Slices/multiCardSlice";

import dynamic from "next/dynamic";
const MulticardSlider = dynamic(() => import("./MulticardSlider"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[400px] w-full">
      <Image
        src="/icons/loader.svg"
        alt="Loader"
        width={50}
        height={50}
        className="animate-spin"
      />
    </div>
  ),
});
// import MulticardSlider from "./MulticardSlider";

const Multicard = ({ forhomePage }) => {
  const multiCardData = useSelector(selectMultiCardData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (multiCardData.length === 0) {
      dispatch({ type: "FETCH_MULTICARD_REQUEST", payload: "multiCard" });
    }
  }, []);

  return (
    <div>
      <div
        className={`bg-[#f5f5f5] pb-[20px] mt-[60px] pt-[50px] pl-[20px] sm:pl-[50px]  ${
          forhomePage !== false
            ? "ml-[12px] sm:ml-[20px] md:ml-[0px] lg:mt-[60px] md:pl-[50px]"
            : "pl-0 lg:mt-[60px]"
        }  overflow-x-auto`}
      >
        <div className="w-full flex justify-between items-center ">
          <h2 className="font-semibold text-2xl pb-[20px] pt-[30px]">
          Discover how convenient shopping Ayatrio can be!
          </h2>
          <div className=" flex text-2xl cursor-pointer text-white rounded-full gap-4">
            <Image
              loading="lazy"
              src="/icons/backarrowblack.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="back rounded-full h-7 w-7 "
            />
            <Image
              loading="lazy"
              src="/icons/rightarrowblack.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="right lg:mr-16 mr-6 rounded-full h-7 w-7 "
            />
          </div>
        </div>{" "}
        <MulticardSlider multicardData={multiCardData} />
      </div>
    </div>
  );
};

export default Multicard;
