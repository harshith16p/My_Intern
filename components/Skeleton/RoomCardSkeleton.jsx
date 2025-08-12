"use client";
function RoomCardSkeleton() {
  return (
    <div className="flex justify-between mx-auto mt-[100px] mb-[100px] sm:px-[20px]  md:px-[52px] px-[12px]">
      <div className="w-full flex justify-center screens">
        <div className="w-full h-[1600px] md:h-[730px] grid grid-cols-2 lg:grid-cols-12 gap-y-4 gap-x-4 auto-rows-fr">
          <div className="parent col-start-1 col-end-3 row-start-1 lg:mb-0 row-end-6 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12">
            <div className="parent relative w-full h-full bg-[#f1f1f1]"></div>
          </div>

          <div className="parent col-start-1 col-end-2 row-start-6 row-span-2 lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6">
            <div className="parent relative w-full h-full bg-[#f1f1f1]"></div>
          </div>

          <div className="parent col-start-2 col-end-3 row-start-6 row-span-3 lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7">
            <div className="parent relative w-full h-full bg-[#f1f1f1]"></div>
          </div>

          <div className="parent col-start-1 col-end-2 row-start-8 row-span-3 lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-12">
            <div className="parent relative w-full h-full bg-[#f1f1f1]"></div>
          </div>

          <div className="parent col-start-2 col-end-3 row-start-9 row-span-2 lg:col-start-10 lg:col-end-13 lg:row-start-7 lg:row-end-12">
            <div className="parent relative w-full h-full bg-[#f1f1f1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCardSkeleton;
