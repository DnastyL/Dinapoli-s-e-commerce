export const DashboardSkeleton = () => {
  return (
    <div className={`sm:h-full h-[814px]`}>
      <div className="flex items-center justify-center py-3">
        <ImageSliderSkeleton />
      </div>
      <div className="flex items-center justify-center p-3 ">
        <div className="flex flex-col gap-5 w-[1152px]">
          <div className="h-5 w-[144px] bg-blue-gray-300 animate-pulse rounded-md" />
          <ProductSliderSkeleton />
        </div>
      </div>
    </div>
  );
};

export const ImageSliderSkeleton = () => {
  return (
    <div
      className={`w-[735px] md:w-[1152px] h-[230px] overflow-hidden relative bg-blue-gray-300 rounded-md animate-pulse`}
    ></div>
  );
};

export const ProductSliderSkeleton = () => {
  return (
    <div className="w-full flex items-center relative h-[330px] bg-blue-gray-200">
      <div className="w-max h-[280px] px-6 flex gap-3 overflow-hidden">
        <ProductBoxSkeleton />
        <ProductBoxSkeleton />
        <ProductBoxSkeleton />
        <ProductBoxSkeleton />
        <ProductBoxSkeleton />
      </div>
    </div>
  );
};

export const ProductBoxSkeleton = () => {
  return (
    <div className="sm:w-[240px] w-[175px] gap-3 p-2 bg-blue-gray-300 animate-pulse rounded-lg">
      <div className="bg-blue-gray-200 animate-pulse h-[180px] w-auto rounded-md" />
      <div className="bg-blue-gray-200 animate-pulse h-8 w-56 rounded-md mt-2 mb-4" />
      <div className="bg-blue-gray-200 animate-pulse h-6 w-36 rounded-md mt-2 mb-3" />
    </div>
  );
};
