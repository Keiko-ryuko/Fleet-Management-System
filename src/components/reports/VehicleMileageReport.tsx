"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Vehicle } from "@/types/vehicle";
import { ReportCard } from "./ReportCard";

interface VehicleMileageReportProps {
  vehicles: Vehicle[];
}

export const VehicleMileageReport: React.FC<VehicleMileageReportProps> = ({
  vehicles,
}) => {
  const totalFleetMileage = vehicles.reduce((sum, vehicle) => sum + vehicle.mileage, 0);
  const averageVehicleMileage = vehicles.length > 0 ? totalFleetMileage / vehicles.length : 0;

  // Sort vehicles by mileage for a clearer chart
  const chartData = [...vehicles]
    .sort((a, b) => b.mileage - a.mileage)
    .map(v => ({ name: `${v.make} ${v.model} (${v.licensePlate})`, mileage: v.mileage }));

  return (
    <ReportCard title="Vehicle Mileage Overview">
      <div className="mb-4">
        <p className="text-lg font-semibold">Total Fleet Mileage: {totalFleetMileage.toLocaleString()} miles</p>
        <p className="text-lg font-semibold">Average Vehicle Mileage: {averageVehicleMileage.toLocaleString(undefined, { maximumFractionDigits: 0 })} miles</p>
        <p className="text-sm text-muted-foreground">Insights into vehicle usage.</p>
      </div>
      <h3 className="text-md font-semibold mb-2">Mileage by Vehicle</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide /> {/* Hide XAxis labels for cleaner look if many vehicles */}
          <YAxis />
          <Tooltip formatter={(value: number) => `${value.toLocaleString()} miles`} />
          <Legend />
          <Line type="monotone" dataKey="mileage" stroke="#8884d8" activeDot={{ r: 8 }} name="Mileage" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-2">Vehicles ordered by mileage (highest first).</p>
    </ReportCard>
  );
};