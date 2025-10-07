"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MaintenanceRecord } from "@/types/maintenance";
import { ReportCard } from "./ReportCard";

interface MaintenanceCostReportProps {
  records: MaintenanceRecord[];
}

export const MaintenanceCostReport: React.FC<MaintenanceCostReportProps> = ({
  records,
}) => {
  const totalCost = records.reduce((sum, record) => sum + record.cost, 0);

  // Aggregate costs by month for the chart
  const monthlyCosts = records.reduce((acc, record) => {
    const month = record.date.substring(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + record.cost;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyCosts)
    .map(([month, cost]) => ({ month, cost }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <ReportCard title="Maintenance Cost Overview">
      <div className="mb-4">
        <p className="text-lg font-semibold">Total Maintenance Cost: ${totalCost.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Across all recorded maintenance.</p>
      </div>
      <h3 className="text-md font-semibold mb-2">Monthly Costs</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="cost" fill="#8884d8" name="Cost" />
        </BarChart>
      </ResponsiveContainer>
    </ReportCard>
  );
};