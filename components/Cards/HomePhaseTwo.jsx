// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// const Loader = dynamic(() => import("../Cards/Loader"));
// import TabWrapperSkeleton from "./../Skeleton/TabWrapperSkeleton";
// const Footer = dynamic(() => import("../Footer/Footer"));
// const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
// const TabsWrapper = dynamic(() => import("./TabsWrapper"), {
//   ssr: false,
//   loading: () => <TabWrapperSkeleton />,
// });
// const Profile = dynamic(() => import("./Profile"), {
//   ssr: false,
//   loading: () => <Loader />,
// });
// const Phone = dynamic(() => import("./Phone"));
// const RankedProducts = dynamic(() => import("./RankedProducts"));
// const Suggestion = dynamic(() => import("./Suggestion"));
// const MulticardService = dynamic(() => import("./MultiCardService"));
// const ShopByRoomSlider = dynamic(() => import("./ShopByRoomSlider"));
// const Display = dynamic(() => import("./Display"));
// import RoomCardSkeleton from "./../Skeleton/RoomCardSkeleton";
// import CategorySlidesSkeleton from "./../Skeleton/CategorySlidesSkeleton";
// const RoomCard = dynamic(() => import("./RoomCard"), {
//   ssr: false,
//   loading: () => <RoomCardSkeleton />,
// });
// const DataSliderWrapper = dynamic(() => import("./DataSliderWrapper"), {
//   loading: () => <CategorySlidesSkeleton />,
// });
// const UserReviewPosts = dynamic(() => import("./UserReviewPosts"));

// function HomePhaseTwo() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 2000); // Delay of 2000ms (2 seconds)
//     return () => clearTimeout(timer);
//   }, []);

//   if (!isLoaded) {
//     return (
//       <div className="w-full p-4 flex justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-auto">
//       {/* First four components loaded on the server */}
//       <div>
//         <RoomCard />
//         <DataSliderWrapper />
//         <Display />
//         <RankedProducts />
//       </div>
//       <Multicard />
//       <ShopByRoomSlider />
//       <Profile />
//       <Suggestion />

//       <div className="sm:px-[50px] px-[20px] lg:px-[67px]">
//         {/* Additional user content can be added here */}
//       </div>

//       <MulticardService />

//       <div className="g">
//         <TabsWrapper />
//         <Phone />
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default HomePhaseTwo;

"use client";
// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import RoomCardSkeleton from "./../Skeleton/RoomCardSkeleton";
// import CategorySlidesSkeleton from "./../Skeleton/CategorySlidesSkeleton";

// const Loader = dynamic(() => import("../Cards/Loader"));
// const Footer = dynamic(() => import("../Footer/Footer"));
// const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
// const TabsWrapper = dynamic(() => import("./TabsWrapper"), {
//   ssr: false,
//   loading: () => <Loader />,
// });
// const Profile = dynamic(() => import("./Profile"), {
//   ssr: false,
//   loading: () => <Loader />,
// });
// const Phone = dynamic(() => import("./Phone"));
// const RankedProducts = dynamic(() => import("./RankedProducts"));
// const Suggestion = dynamic(() => import("./Suggestion"));
// const MulticardService = dynamic(() => import("./MultiCardService"));
// const ShopByRoomSlider = dynamic(() => import("./ShopByRoomSlider"));
// const Display = dynamic(() => import("./Display"));
// const RoomCard = dynamic(() => import("./RoomCard"), {
//   ssr: false,
//   loading: () => <RoomCardSkeleton />,
// });
// const DataSliderWrapper = dynamic(() => import("./DataSliderWrapper"), {
//   loading: () => <CategorySlidesSkeleton />,
// });
// const UserReviewPosts = dynamic(() => import("./UserReviewPosts"));

// function HomePhaseTwo() {
//   const [loadedComponents, setLoadedComponents] = useState(0);

//   const components = [
//     <RoomCard key="RoomCard" />,
//     <DataSliderWrapper key="DataSliderWrapper" />,
//     <Display key="Display" />,
//     <RankedProducts key="RankedProducts" />,
//     <Multicard key="Multicard" />,
//     <ShopByRoomSlider key="ShopByRoomSlider" />,
//     <Profile key="Profile" />,
//     <Suggestion key="Suggestion" />,
//     <MulticardService key="MulticardService" />,
//     <TabsWrapper key="TabsWrapper" />,
//     <Phone key="Phone" />,
//     <Footer key="Footer" />,
//   ];

//   useEffect(() => {
//     if (loadedComponents < components.length) {
//       const timer = setTimeout(() => {
//         setLoadedComponents((prev) => prev + 1);
//       }, 500); // Adjust the delay between component loads as needed
//       return () => clearTimeout(timer);
//     }
//   }, [loadedComponents]);

//   return (
//     <div className="w-full h-auto">
//       {components.slice(0, loadedComponents)}

//       {loadedComponents < components.length && (
//         <div className="w-full p-4 flex justify-center">
//           <Loader />
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomePhaseTwo;




import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("../Cards/Loader"));
const Footer = dynamic(() => import("../Footer/Footer"));
const Multicard = dynamic(() => import("../Imagechanger/Multicard"));
const TabsWrapper = dynamic(() => import("./TabsWrapper"), {
  ssr: false,
  loading: () => <TabWrapperSkeleton />,
});
const Profile = dynamic(() => import("./Profile"), {
  ssr: false,
  loading: () => <Loader />,
});
const Phone = dynamic(() => import("./Phone"));
const RankedProducts = dynamic(() => import("./RankedProducts"));
const Suggestion = dynamic(() => import("./Suggestion"));
const MulticardService = dynamic(() => import("./MultiCardService"));
const ShopByRoomSlider = dynamic(() => import("./ShopByRoomSlider"));
const Display = dynamic(() => import("./Display"));
import RoomCardSkeleton from "./../Skeleton/RoomCardSkeleton";
import CategorySlidesSkeleton from "./../Skeleton/CategorySlidesSkeleton";
const RoomCard = dynamic(() => import("./RoomCard"), {
  ssr: false,
  loading: () => <RoomCardSkeleton />,
});
const DataSliderWrapper = dynamic(() => import("./DataSliderWrapper"), {
  loading: () => <CategorySlidesSkeleton />,
});

/** Utility function to create a delay */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function HomePhaseTwo() {
  const [currentStep, setCurrentStep] = useState(0);

  const components = [
    () => <RoomCard />,
    () => <DataSliderWrapper />,
    () => <Display />,
    () => <RankedProducts />,
    () => <Multicard />,
    () => <ShopByRoomSlider />,
    () => <Profile />,
    () => <Suggestion />,
    () => <MulticardService />,
    () => <TabsWrapper />,
    () => <Phone />,
    () => <Footer />,
  ];

  useEffect(() => {
    let isMounted = true;

    const loadSequentially = async () => {
      for (let i = 0; i < components.length; i++) {
        if (!isMounted) break;
        await delay(1000); // Delay of 1 second between components
        if (isMounted) setCurrentStep((prev) => prev + 1);
      }
    };

    loadSequentially();

    return () => {
      isMounted = false; // Cleanup to prevent updates after unmount
    };
  }, []);

  return (
    <div className="w-full h-auto">
      {components.slice(0, currentStep).map((Component, index) => (
        <div key={index}>{Component()}</div>
      ))}

      {currentStep < components.length && (
        <div className="fixed bottom-0 left-0 w-full p-4 flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default HomePhaseTwo;

