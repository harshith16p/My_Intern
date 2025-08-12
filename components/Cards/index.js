// "use client";
import Cookies from "./Cookies";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import RoomCardSkeleton from "./../Skeleton/RoomCardSkeleton";
import CategorySlidesSkeleton from "./../Skeleton/CategorySlidesSkeleton";
import TabWrapperSkeleton from "../Skeleton/TabWrapperSkeleton";
import ShopByRoomSliderSkeleton from "./../Skeleton/ShopByRoomSliderSkeleton";
import Loader from "./Loader";

import MainSliderWrapper from "../MainSlider/MainSliderWrapper";
import Trending from "./Trending";
import CategoriesSlider from "./categorySlider";

const Banner = dynamic(() => import("./Banner"), {
  ssr: false,
  loading: () => <Loader />,
});

const Footer = dynamic(() => import("../Footer/Footer"));
const Multicard = dynamic(() => import("../Imagechanger/Multicard"), {
  ssr: false,
});
const TabsWrapper = dynamic(() => import("./TabsWrapper"), {
  ssr: false,
  loading: () => <TabWrapperSkeleton />,
});
const Profile = dynamic(() => import("./Profile"), {
  ssr: false,
  loading: () => <Loader />,
});
const Phone = dynamic(() => import("./Phone"));

const Suggestion = dynamic(() => import("./Suggestion"), {
  ssr: false,
  loading: () => <ShopByRoomSliderSkeleton />,
});
// import MulticardService from "./MultiCardService";
const MulticardService = dynamic(() => import("./MultiCardService"), {
  ssr: false,
});
const ShopByRoomSlider = dynamic(() => import("./ShopByRoomSlider"), {
  ssr: false,
  loading: () => <ShopByRoomSliderSkeleton />,
});
const Display = dynamic(() => import("./Display"));
const RoomCard = dynamic(() => import("./RoomCard"), {
  ssr: false,
  loading: () => <RoomCardSkeleton />,
});
const DataSliderWrapper = dynamic(() => import("./DataSliderWrapper"), {
  ssr: false,
  loading: () => (
    <>
      <CategorySlidesSkeleton />
      <CategorySlidesSkeleton />
      <CategorySlidesSkeleton />
      {/* <CategorySlidesSkeleton /> */}
    </>
  ),
});
const RankedProducts = dynamic(() => import("./RankedProducts"), {
  ssr: false,
});
const UserReviewPosts = dynamic(() => import("./UserReviewPosts"));
// const CategoriesSlider = dynamic(() => import("./categorySlider"), { ssr: true });

// import Display from "./Display";
// import RoomCard from "./RoomCard";
// import Profile from "./Profile";
// import DataSliderWrapper from "./DataSliderWrapper";
// import UserReviewPosts from "./UserReviewPosts";

// import Trending from "./Trending";
// import { useState, useEffect, useCallback } from "react";

function Cards() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("navigationItem");
  }

  return (
    <div className="w-full h-auto">
      <MainSliderWrapper />

      {/* <div> */}
      <CategoriesSlider />
      <Cookies />
      <Trending />
      <Suspense fallback={<Loader />}>
        <RoomCard />
        <Banner />
        <DataSliderWrapper />
        <Display />
        {/* <DataSliderWrapper
          sliderIndexStart={2}
          sliderIndexEnd={4}
          sliderIndexOffset={2}
        /> */}
        <RankedProducts />
        {/* </div> */}
       
        <Multicard />
        <ShopByRoomSlider />
        <Profile />
        <MulticardService />
        <Suggestion />

        <div className="sm:px-[52px]  px-[20px]  lg:px-[52px]">
          <UserReviewPosts slidesPerView={3.2} />
        </div>

       

        <div className="g">
          <TabsWrapper />
          <Phone />
        </div>
      </Suspense>

      <Footer />
    </div>
  );
}
export default Cards;

// export default Cards;
// import dynamic from "next/dynamic";
// import HomePhaseOne from "./HomePhaseOne";
// // import HomePhaseTwo from "./HomePhaseTwo";
// const HomePhaseTwo = dynamic(() => import("./HomePhaseTwo"), {
//   ssr: false,
//   loading: () => <Loader />,
// })

// function Cards() {
//   return (
//     <div className="w-full h-auto">
//       <HomePhaseOne />
//       <HomePhaseTwo />
//     </div>
//   )
// }
