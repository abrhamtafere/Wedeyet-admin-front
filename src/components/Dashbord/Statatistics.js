import React from "react";
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export const Statatistics = () => {
  return <div className="container mx-auto px-4 py-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Dashboard card 1 */}
    <div className="flex bg-white p-4 shadow gap-4">
    <div className="">
        <h2 className="text-gray-800 text-lg font-bold mb-2">
          18
        </h2>
        <p className="text-gray-600">unique visitors</p>
      </div>
      <div className="flex rounded-full text-lime-600 px-2 items-center justify-center  w-12 h-12">
        <ArrowUpwardOutlinedIcon className="" fontSize='small' /> 18%
      </div>
    </div>

    {/* Dashboard card 2 */}
    <div className="flex bg-white p-4 shadow gap-4">
    <div className="">
        <h2 className="text-gray-800 text-lg font-bold mb-2">
          54%
        </h2>
        <p className="text-gray-600">bounce rate</p>
      </div>
      <div className="flex rounded-full text-amber-500 px-2 items-center justify-center  w-12 h-12">
        <ArrowDownwardOutlinedIcon className="" fontSize='small' /> 7%
      </div>
    </div>

    {/* Dashboard card 3 */}
    <div className="flex bg-white p-4 shadow gap-4">
    <div className="">
        <h2 className="text-gray-800 text-lg font-bold mb-2 ">
          22m 56s
        </h2>
        <p className="text-gray-600">visit duration</p>
      </div>
      <div className="flex rounded-full text-lime-600 px-2 items-center justify-center  w-12 h-12">
        <ArrowUpwardOutlinedIcon className="" fontSize='small' /> 12%
      </div>
    </div>

    </div>
</div>
};
