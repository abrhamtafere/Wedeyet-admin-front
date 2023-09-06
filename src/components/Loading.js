import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="loader ease-linear rounded-full border-[7px]  border-t-blue-500  h-16 w-16 animate-spin"></div>
    </div>
  );
};