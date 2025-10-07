"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import { AddVehicleDialog } from "@/components/vehicles/AddVehicleDialog";
import { AssignDriverDialog } from "@/components/vehicles/AssignDriverDialog"; // Import new dialog
import { Vehicle } from "@/types/vehicle";
import { Driver } from "@/types/driver"; // Import Driver type
import { toast } from "sonner";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", make: "Ford", model: "F-150", year: 2020, licensePlate: "ABC-123", vin: "VIN1234567890", status: "active", mileage: 50000, assignedDriverId: "D001" },
    { id: "2", make: "Mercedes-Benz", model: "Sprinter", year: 2018, licensePlate: "DEF-456", vin: "VIN0987654321", status: "maintenance", mileage: 75000, assignedDriverId: null },
    { id: "3", make: "Tesla", model: "Model 3", year: 2022, licensePlate: "GHI-789", vin: "VIN1122334455", status: "active", mileage: 20000, assignedDriverId: "D003" },
  ]);

  // Dummy drivers data for assignment (in a real app, this would come from a global state or API)
  const [drivers] = useState<Driver[]>([
    { id: "D001", name: "John Doe", licenseNumber: "DL12345", contactNumber: "555-1111", email: "john.doe@example.com", status: "active" },
    { id: "D002", name: "Jane Smith", licenseNumber: "DL67890", contactNumber: "555-2222", email: "jane.smith@example.com", status: "on-leave" },
    { id: "D003", name: "Peter Jones", licenseNumber: "DL11223", contactNumber: "555-3333", email: "peter.jones@example.com", status: "active" },
  ]);

  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [vehicleToAssign, setVehicleToAssign] = useState<Vehicle | null>(null);

  const handleAddVehicle = (newVehicleData: Omit<Vehicle, "id">) => {
    const newVehicle: Vehicle = {
      id: (vehicles.length + 1).toString(), // Simple ID generation
      ...newVehicleData,
      assignedDriverId: null, // New vehicles start unassigned
    };
    setVehicles((prev) => [...prev, newVehicle]);
    toast.success("Vehicle added successfully!");
  };

  const handleEditVehicle = (vehicleToEdit: Vehicle) => {
    setEditingVehicle(vehicleToEdit);
    setIsAddEditDialogOpen(true);
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

  const handleCloseAddEditDialog = () => {
    setIsAddEditDialogOpen(false);
    setEditingVehicle(null);
  };

  const handleAssignDriverClick = (vehicle: Vehicle) => {
    setVehicleToAssign(vehicle);
    setIsAssignDialogOpen(true);
  };

  const handleAssignDriver = (vehicleId: string, driverId: string | null) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, assignedDriverId: driverId } : v
      )
    );
    toast.success(driverId ? "Driver assigned successfully!" : "Driver unassigned successfully!");
  };

  const handleCloseAssignDialog = () => {
    setIsAssignDialogOpen(false);
    setVehicleToAssign(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Vehicles</h1>
        <Button onClick={() => setIsAddEditDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      </div>

      <p className="text-lg text-gray-700 mb-8">
        Manage your fleet's vehicles here.
      </p>

      <VehicleTable
        vehicles={vehicles}
        drivers={drivers} // Pass drivers to the table
        onEdit={handleEditVehicle}
        onDelete={handleDeleteVehicle}
        onAssignDriver={handleAssignDriverClick} // Pass new handler
      />

      <AddVehicleDialog
        isOpen={isAddEditDialogOpen}
        onClose={handleCloseAddEditDialog}
        onSave={editingVehicle ? handleSaveEditedVehicle : handleAddVehicle}
        editingVehicle={editingVehicle}
      />

      <AssignDriverDialog
        isOpen={isAssignDialogOpen}
        onClose={handleCloseAssignDialog}
        onAssign={handleAssignDriver}
        vehicleToAssign={vehicleToAssign}
        drivers={drivers}
      />
    </div>
  );
};

export default Vehicles;