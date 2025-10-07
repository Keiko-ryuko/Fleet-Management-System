"use client";

import React from "react";

const Vehicles = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Vehicles</h1>
      <p className="text-lg text-gray-700">
        Manage your fleet's vehicles here.
      </p>
      {/* Placeholder for vehicle list/table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Vehicle List</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Truck 1 (License: ABC-123)</li>
          <li>Van 2 (License: DEF-456)</li>
          <li>Car 3 (License: GHI-789)</li>
        </ul>
      </div>
    </div>
  );
};

export default Vehicles;