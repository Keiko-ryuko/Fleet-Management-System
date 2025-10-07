"use client";

import React from "react";

const Drivers = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Drivers</h1>
      <p className="text-lg text-gray-700">
        Manage your drivers and their assignments.
      </p>
      {/* Placeholder for driver list/table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Driver List</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>John Doe (ID: D001)</li>
          <li>Jane Smith (ID: D002)</li>
          <li>Peter Jones (ID: D003)</li>
        </ul>
      </div>
    </div>
  );
};

export default Drivers;