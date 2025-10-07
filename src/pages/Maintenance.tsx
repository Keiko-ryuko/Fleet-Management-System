"use client";

import React from "react";

const Maintenance = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Maintenance</h1>
      <p className="text-lg text-gray-700">
        Track and schedule vehicle maintenance.
      </p>
      {/* Placeholder for maintenance schedule */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Truck 1: Oil Change (Due: 2024-10-01)</li>
          <li>Van 2: Tire Rotation (Due: 2024-09-15)</li>
        </ul>
      </div>
    </div>
  );
};

export default Maintenance;