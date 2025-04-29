import React from "react";

const SearchItemSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4  mt-2 mx-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 bg-[#0f12281a] w-16 shrink-0 "></div>
        <div className="flex flex-col w-full gap-4">
          <div className="skeleton bg-[#0f12281a] h-4 w-60"></div>
          <div className="skeleton bg-[#0f12281a] h-4 w-40"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchItemSkeleton;
