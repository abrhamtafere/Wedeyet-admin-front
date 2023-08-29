import React from 'react';

export const Dashboard = () => {
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
          <div className="bg-white p-4 shadow">
            <h2 className="text-gray-800 text-lg font-semibold mb-2">Card 1</h2>
            <p className="text-gray-600">Card content goes here</p>
          </div>

          {/* Dashboard card 2 */}
          <div className="bg-white p-4 shadow">
            <h2 className="text-gray-800 text-lg font-semibold mb-2">Card 2</h2>
            <p className="text-gray-600">Card content goes here</p>
          </div>

          {/* Dashboard card 3 */}
          <div className="bg-white p-4 shadow">
            <h2 className="text-gray-800 text-lg font-semibold mb-2">Card 3</h2>
            <p className="text-gray-600">Card content goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};