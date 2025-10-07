"use client";

import React, { useState } from "react";
import { Car, Users, Wrench } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { VehicleStatusChart } from "@/components/dashboard/VehicleStatusChart";
import { Vehicle } from "@/types/vehicle"; // Import Vehicle type

const Dashboard = () => {
  // Dummy data for demonstration
  const [vehicles] = useState<Vehicle[]>([
    { id: "1", make: "Ford", model: "F-150", year: 2020, licensePlate: "ABC-123", vin: "VIN1234567890", status: "active", mileage: 50000 },
    { id: "2", make: "Mercedes-Benz", model: "Sprinter", year: 2018, licensePlate: "DEF-456", vin: "VIN0987654321", status: "maintenance", mileage: 75000 },
    { id: "3", make: "Tesla", model: "Model 3", year: 2022, licensePlate: "GHI-789", vin: "VIN1122334455", status: "active", mileage: 20000 },
    { id: "4", make: "Chevrolet", model: "Silverado", year: 2021, licensePlate: "JKL-012", vin: "VIN6789012345", status: "active", mileage: 30000 },
    { id: "5", make: "Nissan", model: "NV200", year: 2019, licensePlate: "MNO-345", vin: "VIN2345678901", status: "inactive", mileage: 90000 },
    { id: "6", make: "Ram", model: "ProMaster", year: 2020, licensePlate: "PQR-678", vin: "VIN3456789012", status: "maintenance", mileage: 60000 },
  ]);

  const totalVehicles = vehicles.length;
  const activeDrivers = 18; // Placeholder
  const upcomingMaintenance = vehicles.filter(v => v.status === "maintenance").length;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg text-gray-700 mb-8">
        Welcome to your Fleet Management Dashboard!
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Vehicles"
          value={totalVehicles}
          description="Number of vehicles in your fleet"
          icon={<Car className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Active Drivers"
          value={activeDrivers}
          description="Drivers currently assigned to vehicles"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Upcoming Maintenance"
          value={upcomingMaintenance}
          description="Vehicles requiring maintenance soon"
          icon={<Wrench className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard title="Vehicle Status Overview" value="">
          <VehicleStatusChart vehicles={vehicles} />
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;