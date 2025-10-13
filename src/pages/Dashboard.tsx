"use client";

import React, { useState } from "react";
import { Car, Users, Wrench } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { VehicleStatusChart } from "@/components/dashboard/VehicleStatusChart";
import { Vehicle } from "@/types/vehicle"; // Import Vehicle type

const Dashboard = () => {
  // Removed dummy data for demonstration, initializing with an empty array
  const [vehicles] = useState<Vehicle[]>([]);

  // Placeholder values for metrics, reflecting an empty state
  const totalVehicles = vehicles.length;
  const activeDrivers = 0; // Placeholder, would be derived from actual driver data
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
          {totalVehicles === 0 ? (
            <p className="text-center text-muted-foreground py-8">No vehicle data to display status.</p>
          ) : (
            <VehicleStatusChart vehicles={vehicles} />
          )}
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;