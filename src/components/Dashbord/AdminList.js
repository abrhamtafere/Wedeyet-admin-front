import React from "react";

const AdminList = () => {
  return (
    
      <div className="flex ">
        {/* First Column */}
        <div className="bg-white w-3/4 rounded-lg shadow-md p-4 mr-8 mb-4">
        <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full ring-2 ring-lime-400 bg-gray-300"></div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Admin Name</h2>
              <p className="text-gray-500">Admin Role</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Admin Name</h2>
              <p className="text-gray-500">Admin Role</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Admin Name</h2>
              <p className="text-gray-500">Admin Role</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Admin Name</h2>
              <p className="text-gray-500">Admin Role</p>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="w-1/4 grid grid-cols-2 gap-4 p-2">
          {/* Feedbacks Card */}
          <div className="bg-orange-300 rounded-lg shadow-md p-4 h-[100px]">
            <h3 className="text-lg font-medium mb-2">Feedbacks</h3>
            <p className="text-gray-500 text-sm">Total: 10</p>
          </div>

          {/* Feedbacks Card */}
          <div className="bg-lime-400 rounded-lg shadow-md p-4 h-[100px]">
            <h3 className="text-lg font-medium mb-2">FAQ</h3>
            <p className="text-gray-500 text-sm">Total: 10</p>
          </div>

          {/* Feedbacks Card */}
          <div className="bg-cyan-400 rounded-lg shadow-md p-4 h-[100px]">
            <h3 className="text-lg font-medium mb-2">Shops</h3>
            <p className="text-gray-500 text-sm">Total: 10</p>
          </div>

          {/* Feedbacks Card */}
          <div className="bg-fuchsia-400 rounded-lg shadow-md p-4 h-[100px]">
            <h3 className="text-lg font-medium mb-2">Restorant</h3>
            <p className="text-gray-500 text-sm">Total: 10</p>
          </div>

          {/* Feedbacks Card */}
          <div className="bg-yellow-400 rounded-lg shadow-md p-4 h-[100px]">
            <h3 className="text-lg font-medium mb-2">Businesses</h3>
            <p className="text-gray-500 text-sm">Total: 10</p>
          </div>

          {/* Users Card */}
          <div className="bg-indigo-400 rounded-lg shadow-md p-4 h-[100px]">
            <h3 className="text-lg font-medium mb-2">Users</h3>
            <p className="text-gray-500 text-sm">Total: 100</p>
          </div>

          {/* Other Cards */}
          {/* Add more cards as needed */}
        </div>
      </div>
  );
};

export default AdminList;