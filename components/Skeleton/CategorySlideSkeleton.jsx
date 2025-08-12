function CategorySlideSkeleton() {
  return (
    <div
      className="card pb-12 h-[700px]"
      // style={{ width: '100%', height: '100%' }}
    >
      {/* Top Labels */}
      <div className="relative">
        {/* Image Placeholder */}
        <div className="relative flex h-full w-full items-center justify-center aspect-square bg-[#f1f1f1] animate-pulse"></div>
      </div>

      {/* Card Content */}
      <div className="mt-4 h-full">
      <div className="h-4 w-3/4 bg-[#f1f1f1] animate-pulse my-2 "></div>
        <div className="h-4 w-2/4 bg-[#f1f1f1] animate-pulse my-2 "></div>
       <div className="h-4 w-2/5 bg-[#f1f1f1] animate-pulse my-2 "></div>
      </div>
    </div>
  );
}

export default CategorySlideSkeleton;
