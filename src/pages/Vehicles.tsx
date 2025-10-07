"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import { AddVehicleDialog } from "@/components/vehicles/AddVehicleDialog";
import { Vehicle } from "@/types/vehicle";
import { toast } from "sonner";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", make: "Ford", model: "F-150", year: 2020, licensePlate: "ABC-123", vin: "VIN1234567890", status: "active", mileage: 50000 },
    { id: "2", make: "Mercedes-Benz", model: "Sprinter", year: 2018, licensePlate: "DEF-456", vin: "VIN0987654321", status: "maintenance", mileage: 75000 },
    { id: "3", make: "Tesla", model: "Model 3", year: 2022, licensePlate: "GHI-789", vin: "VIN1122334455", status: "active", mileage: 20000 },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleAddVehicle = (newVehicleData: Omit<Vehicle, "id">) => {
    const newVehicle: Vehicle = {
      id: (vehicles.length + 1).toString(), // Simple ID generation
      ...newVehicleData,
    };
    setVehicles((prev) => [...prev, newVehicle]);
    toast.success("Vehicle added successfully!");
  };

  const handleEditVehicle = (vehicleToEdit: Vehicle) => {
    setEditingVehicle(vehicleToEdit);
    setIsDialogOpen(true);
  };

  const handleSaveEditedVehicle = (updatedVehicleData: Omit<Vehicle, "id">) => {
    if (editingVehicle) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editingVehicle.id ? { ...v, ...updatedVehicleData } : v
        )
      );
      toast.success("Vehicle updated successfully!");
    }
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast.success("Vehicle deleted successfully!");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVehicle(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Vehicles</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      </div>

      <p className="text-lg text-gray-700 mb-8">
        Manage your fleet's vehicles here.
      </p>

      <VehicleTable
        vehicles={vehicles}
        onEdit={handleEditVehicle}
        onDelete={handleDeleteVehicle}
      />

      <AddVehicleDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={editingVehicle ? handleSaveEditedVehicle : handleAddVehicle}
        editingVehicle={editingVehicle}
      />
    </div>
  );
};

export default Vehicles;