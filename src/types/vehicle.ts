export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: "active" | "inactive" | "maintenance";
  mileage: number; // Added mileage field
}