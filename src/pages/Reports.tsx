"use client";

import React from "react";

const Reports = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <p className="text-lg text-gray-700">
        Generate and view various fleet reports.
      </p>
      {/* Placeholder for report options */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Fuel Consumption Report</li>
          <li>Driver Performance Report</li>
          <li>Maintenance Cost Report</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;