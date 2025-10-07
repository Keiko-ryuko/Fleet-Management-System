"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg text-gray-700">
        Welcome to your Fleet Management Dashboard!
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for dashboard widgets */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Vehicles</h2>
          <p className="text-3xl font-bold text-blue-600">25</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Drivers</h2>
          <p className="text-3xl font-bold text-green-600">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Upcoming Maintenance</h2>
          <p className="text-3xl font-bold text-yellow-600">3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;