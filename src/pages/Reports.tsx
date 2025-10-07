"use client";

import React, { useState } from "react";
import { ReportCard } from "@/components/reports/ReportCard";
import { MaintenanceCostReport } from "@/components/reports/MaintenanceCostReport";
import { VehicleMileageReport } from "@/components/reports/VehicleMileageReport";
import { Vehicle } from "@/types/vehicle";
import { MaintenanceRecord } from "@/types/maintenance";

const Reports = () => {
  // Dummy data for reports (can be fetched from state or API in a real app)
  const [vehicles] = useState<Vehicle[]>([
    { id: "1", make: "Ford", model: "F-150", year: 2020, licensePlate: "ABC-123", vin: "VIN1234567890", status: "active", mileage: 50000 },
    { id: "2", make: "Mercedes-Benz", model: "Sprinter", year: 2018, licensePlate: "DEF-456", vin: "VIN0987654321", status: "maintenance", mileage: 75000 },
    { id: "3", make: "Tesla", model: "Model 3", year: 2022, licensePlate: "GHI-789", vin: "VIN1122334455", status: "active", mileage: 20000 },
    { id: "4", make: "Chevrolet", model: "Silverado", year: 2021, licensePlate: "JKL-012", vin: "VIN6789012345", status: "active", mileage: 30000 },
    { id: "5", make: "Nissan", model: "NV200", year: 2019, licensePlate: "MNO-345", vin: "VIN2345678901", status: "inactive", mileage: 90000 },
    { id: "6", make: "Ram", model: "ProMaster", year: 2020, licensePlate: "PQR-678", vin: "VIN3456789012", status: "maintenance", mileage: 60000 },
  ]);

  const [maintenanceRecords] = useState<MaintenanceRecord[]>([
    { id: "M001", vehicleId: "1", description: "Oil Change", date: "2024-01-15", cost: 75.00, status: "completed" },
    { id: "M002", vehicleId: "2", description: "Tire Rotation", date: "2024-02-20", cost: 50.00, status: "completed" },
    { id: "M003", vehicleId: "3", description: "Brake Inspection", date: "2024-03-10", cost: 0.00, status: "completed" },
    { id: "M004", vehicleId: "1", description: "Engine Tune-up", date: "2024-04-05", cost: 250.00, status: "scheduled" },
    { id: "M005", vehicleId: "5", description: "Transmission Fluid Change", date: "2024-05-01", cost: 180.00, status: "overdue" },
    { id: "M006", vehicleId: "2", description: "Wheel Alignment", date: "2024-06-12", cost: 80.00, status: "completed" },
    { id: "M007", vehicleId: "4", description: "Oil Change", date: "2024-07-25", cost: 70.00, status: "scheduled" },
    { id: "M008", vehicleId: "6", description: "Brake Pad Replacement", date: "2024-08-01", cost: 150.00, status: "scheduled" },
  ]);

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