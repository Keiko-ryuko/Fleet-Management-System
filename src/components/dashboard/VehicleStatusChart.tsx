"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Vehicle } from "@/types/vehicle";

interface VehicleStatusChartProps {
  vehicles: Vehicle[];
}

const COLORS = {
  active: "#82ca9d", // Green
  maintenance: "#ffc658", // Yellow
  inactive: "#ff7300", // Orange
};

export const VehicleStatusChart: React.FC<VehicleStatusChartProps> = ({
  vehicles,
}) => {
  const data = Object.entries(
    vehicles.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    }, {} as Record<Vehicle["status"], number>)
  ).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: COLORS[status as Vehicle["status"]],
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};