export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: "active" | "inactive" | "maintenance";
  mileage: number;
  assignedDriverId?: string; // New field to link to a driver
}