// components/SkeletonLoader.js
// components/SkeletonLoader.js

// export const MainSliderSkeletonLoader = () => {
//     return (
//       <div
//         className="w-full h-[70vh] max-h-[546px] sm:mt-[96px] px-[12px] sm:px-0 sticky top-0 z-10 skeleton-loader animate-pulse"
//         style={{
//           maxHeight: "70vh",
//         }}
//       >
//         {/* Navigation Buttons */}
//         <div
//           className="opacity-0 pointer-events-none transition absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer rounded-full hidden sm:flex items-center justify-center p-1 rotate-180 bg-gray-300 w-10 h-10"
//         ></div>
//         <div
//           className="opacity-0 pointer-events-none transition absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer rounded-full hidden sm:flex items-center justify-center p-1 bg-gray-300 w-10 h-10"
//         ></div>

//         {/* Swiper Container */}
//         <div
//           className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden"
//           style={{
//             position: "relative",
//           }}
//         >
//           {/* Placeholder slides */}
//           {[...Array(3)].map((_, index) => (
//             <div
//               key={index}
//               className="absolute w-full h-full bg-gray-300 rounded-lg"
//               style={{
//                 opacity: index === 0 ? 1 : 0.5,
//                 animation: fadeInOut 1.5s ${index * 0.5}s infinite,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Optional circles or overlays */}
//         <div
//           className="absolute w-8 h-8 bg-gray-300 rounded-full"
//           style={{
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         ></div>
//       </div>
//     );
//   };

const BodySkeletonLoader = () => {
  return (
    <>
      {/* //   header */}
      <div className=" h-[95px] w-full sm:px-[20px]  md:px-[52px]"></div>
      {/* first slider */}
      <div className="h-[70vh] w-full  bg-[#f1f1f1] sm:px-[20px]  md:px-[52px]"></div>
      {/* category slider */}
      <div className="h-[160px] w-full  flex items-center justify-between gap-2 px-[10px] sm:px-[20px]  md:px-[52px]">
        <div className="h-[70%] w-[100px] bg-[#f1f1f1] md:block hidden"></div>
        <div className="h-[70%] w-[100px] bg-[#f1f1f1] md:block hidden"></div>
        <div className="h-[70%] w-[100px] bg-[#f1f1f1] md:block hidden"></div>
        <div className="h-[70%] w-[100px] bg-[#f1f1f1] sm:block hidden"></div>
        <div className="h-[70%] w-[100px] bg-[#f1f1f1] sm:block hidden"></div>
        <div className="h-[70%] w-[100px] bg-[#f1f1f1] sm:block hidden"></div>
        <div className="h-[70%] w-[100px] bg-[#f1f1f1]"></div>

        <div className="h-[70%] w-[100px] bg-[#f1f1f1]"></div>

        <div className="h-[70%] w-[100px] bg-[#f1f1f1]"></div>
      </div>

      {/* slider */}
      <div class="grid gap-4 sm:px-[20px] px-[10px] md:px-[52px] mb-[60px] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[30px]">
        <div class="card w-full h-full pb-12">
          <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
          <div class="pt-4">
            <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
            <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
          </div>
        </div>

        <div class="card w-full h-full pb-12">
          <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
          <div class="pt-4">
            <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
            <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
          </div>
        </div>

        <div class="card w-full h-full pb-12">
          <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
          <div class="pt-4">
            <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
            <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
          </div>
        </div>

        <div class="card w-full h-full pb-12">
          <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
          <div class="pt-4">
            <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
            <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
          </div>
        </div>
      </div>

      {/* 5grid */}
      <div class="flex justify-between mx-auto px-3   mt-[100px] mb-[120px] sm:px-[20px]  md:px-[52px]">
        <div class="w-full flex justify-center screens">
          <div class="w-full h-[1000px] md:h-[730px] grid grid-cols-2 lg:grid-cols-12 gap-y-4 gap-x-4 auto-rows-fr">
            <div class="parent col-start-1 col-end-3 row-start-1 lg:mb-0 row-end-6 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12">
              <div class="parent relative w-full h-full bg-[#f1f1f1] "></div>
            </div>

            <div class="parent col-start-1 col-end-2 row-start-6 row-span-2 lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6">
              <div class="parent relative w-full h-full bg-[#f1f1f1]"></div>
            </div>

            <div class="parent col-start-2 col-end-3 row-start-6 row-span-3 lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7">
              <div class="parent relative w-full h-full bg-[#f1f1f1]"></div>
            </div>

            <div class="parent col-start-1 col-end-2 row-start-8 row-span-3 lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-12">
              <div class="parent relative w-full h-full bg-[#f1f1f1]"></div>
            </div>

            <div class="parent col-start-2 col-end-3 row-start-9 row-span-2 lg:col-start-10 lg:col-end-13 lg:row-start-7 lg:row-end-12">
              <div class="parent relative w-full h-full bg-[#f1f1f1]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* slider */}
      <div class="mb-[60px] sm:px-[20px] px-[10px] md:px-[52px]">
        <div class="w-1/4 h-6 bg-[#f1f1f1] mb-[30px] px-[10px] sm:px-[20px] md:px-[52px]"></div>

        <div class="grid gap-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2grid */}
      <div class="flex justify-between mx-auto px-3 sm:px-5 md:px-13 mt-[100px] mb-[120px] sm:px-[20px]  md:px-[52px] ">
        <div class="w-full flex justify-center screens ">
          <div class="w-full h-[1000px] md:h-[420px] grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4 auto-rows-fr ">
            <div class="parent col-start-1 col-end-2 row-start-1 lg:mb-0 row-end-3 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-12 ">
              <div class="parent relative w-full h-full bg-[#f1f1f1]"></div>
            </div>

            <div class="parent col-start-1 col-end-2 row-start-3  lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-12 ">
              <div class="parent relative w-full h-full bg-[#f1f1f1]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* slider */}
      <div class="mb-[60px] sm:px-[20px] px-[10px] md:px-[52px]">
        <div class="w-1/4 h-6 bg-[#f1f1f1] mb-[30px] px-[10px] sm:px-[20px] md:px-[52px]"></div>

        <div class="grid gap-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* slider */}
      <div class="mb-[60px] sm:px-[20px] px-[10px] md:px-[52px]">
        <div class="w-1/4 h-6 bg-[#f1f1f1] mb-[30px] px-[10px] sm:px-[20px] md:px-[52px]"></div>

        <div class="grid gap-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>

          <div class="card w-full h-full pb-12">
            <div class="relative w-full h-[300px] bg-[#f1f1f1]"></div>
            <div class="pt-4">
              <div class="w-3/4 h-4 bg-[#f1f1f1] mb-2"></div>
              <div class="w-1/2 h-4 bg-[#f1f1f1]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover how convenient shopping Ayatrio can be! */}

      <div className=" w-full  flex items-center justify-between gap-2 py-4 sm:px-[20px]  md:px-[52px] mt-[100px] mb-[60px]">
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] hidden lg:block"></div>
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] hidden md:blck"></div>
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] hidden sm:block"></div>
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] "></div>
      </div>
      {/* inspiration for every room */}
      <div className=" w-full  flex items-center justify-start gap-2 py-4 sm:px-[20px]  md:px-[52px] my-[60px]">
        <div className="h-[580px] w-[290px] bg-[#f1f1f1]"></div>
        <div className="h-[580px] w-[290px] bg-[#f1f1f1]"></div>
      </div>

      {/* inspiration and suggestion */}

      <div className=" w-full  flex items-center justify-between gap-2 py-4 sm:px-[20px]  md:px-[52px] mb-[60px] mt-[450px]">
        <div className="h-[580px] w-[290px] bg-[#f1f1f1]"></div>
      </div>

      {/* services and financial help on shopping */}
      <div className=" w-full  flex items-center justify-between gap-2 py-4 sm:px-[20px]  md:px-[52px] mt-[100px] mb-[60px]">
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] hidden lg:block"></div>
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] hidden md:block"></div>
        <div className="h-[255px] w-[420px] bg-[#f1f1f1] hidden md:block"></div>
        <div className="h-[255px] w-[420px] bg-[#f1f1f1]"></div>
      </div>

      {/* design inspiration and modern ideas */}
      <div className="sm:px-[20px] px-[10px] md:px-[52px] pb-20 pt-10 h-full">
        <div className="grid grid-cols-3 gap-[17px] auto-rows-[1fr]">
          {/* First column: 871px height item */}
          <div className="w-full h-[871px] bg-[#f1f1f1] animate-pulse "></div>

          {/* Second column: 429px height item */}
          <div className="w-full h-[429px] bg-[#f1f1f1] animate-pulse "></div>

          {/* Third column: 871px height item */}
          <div className="w-full h-[871px] bg-[#f1f1f1] animate-pulse "></div>

          {/* First column: 429px height item */}
          <div className="w-full h-[429px] bg-[#f1f1f1] animate-pulse "></div>

          {/* Second column: 871px height item */}
          <div className="w-full h-[871px] bg-[#f1f1f1] animate-pulse "></div>

          {/* Third column: 429px height item */}
          <div className="w-full h-[429px] bg-[#f1f1f1] animate-pulse "></div>
        </div>
      </div>
    </>
  );
};

export default BodySkeletonLoader;
