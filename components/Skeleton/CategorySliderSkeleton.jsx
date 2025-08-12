"use client";
function CategorySliderSkeleton() {
  return (
    <div className="h-[160px] w-full  flex items-center justify-between gap-2 px-[10px] sm:px-[20px]  md:px-[52px]">
      <div className="h-[100px] w-[100px] bg-[#f1f1f1] md:block hidden "></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1] md:block hidden "></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1] md:block hidden "></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1] sm:block hidden "></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1] sm:block hidden "></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1] sm:block hidden "></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1]"></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1]"></div>
      <div className="h-[100px] w-[100px] bg-[#f1f1f1]"></div>
    </div>
  );
}

export default CategorySliderSkeleton;
