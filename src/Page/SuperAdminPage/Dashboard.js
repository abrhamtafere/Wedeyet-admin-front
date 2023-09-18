import React from "react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import { VisitorsAnalyticsChart } from "../../components/Dashbord/VisitorsAnalyticsChart";
import { DeviceUsageChart } from "../../components/Dashbord/DeviceUsageChart";
import { Statatistics } from "../../components/Dashbord/Statatistics";
import { TopVisited } from "../../components/Dashbord/TopVisited";
import AdminList from "../../components/Dashbord/AdminList";

const Dashboard = () => {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-2">
          {/* Dashboard header content */}
          <h1 className="text-gray-800 text-2xl font-semibold">Dashboard</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Dashboard card 1 */}
          <div className="flex bg-white p-4 shadow gap-4">
            <div className="flex bg-blue-500 rounded-full text-red px-2 items-center justify-center  w-12 h-12 text-white">
              <BusinessOutlinedIcon className="" />
            </div>
            <div className="">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                Total Number of Businesses
              </h2>
              <p className="text-gray-600">4300</p>
            </div>
          </div>

          {/* Dashboard card 2 */}
          <div className="flex bg-white p-4 shadow gap-4">
            <div className="flex bg-green-500 rounded-full text-red px-2 items-center justify-center  w-12 h-12 text-white">
              <CategoryOutlinedIcon className="" />
            </div>
            <div>
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                232 Categories
              </h2>
              <p className="text-gray-600">983 Subcategories</p>
            </div>
          </div>

          {/* Dashboard card 3 */}
          <div className="flex bg-white p-4 shadow gap-4">
            <div className="flex bg-red-500 rounded-full text-red px-2 items-center justify-center  w-12 h-12 text-white">
              <SupervisedUserCircleOutlinedIcon className="" />
            </div>
            <div>
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                2,321,203 total visitors
              </h2>
              <p className="text-gray-600">4300 visitors in this week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white border border-gray-200 col-span-4 p-4">
          <VisitorsAnalyticsChart />
        </div>
        <div className="bg-white col-span-2 p-4">
        <DeviceUsageChart/>
        </div>
      </div>

      <Statatistics />

      <TopVisited />
      <AdminList />
    </div>
  );
};

export default Dashboard;
