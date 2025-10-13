"use client";

import React, { useState } from "react";
import { ReportCard } from "@/components/reports/ReportCard";
import { MaintenanceCostReport } from "@/components/reports/MaintenanceCostReport";
import { VehicleMileageReport } from "@/components/reports/VehicleMileageReport";
import { Vehicle } from "@/types/vehicle";
import { MaintenanceRecord } from "@/types/maintenance";

const Reports = () => {
  // Dummy data for reports (can be fetched from state or API in a real app)
  const [vehicles] = useState<Vehicle[]>([]); // Changed to empty array

  const [maintenanceRecords] = useState<MaintenanceRecord[]>([]); // Changed to empty array

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <p className="text-lg text-gray-700 mb-8">
        Generate and view various fleet reports.
      </p>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <MaintenanceCostReport records={maintenanceRecords} />
        <VehicleMileageReport vehicles={vehicles} />
        {/* Add more report components here */}
      </div>
    </div>
  );
};

export default Reports;