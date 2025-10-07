export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  description: string;
  date: string; // YYYY-MM-DD format
  cost: number;
  status: "scheduled" | "completed" | "overdue";
}