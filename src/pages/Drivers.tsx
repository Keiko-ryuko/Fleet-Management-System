"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DriverTable } from "@/components/drivers/DriverTable";
import { AddDriverDialog } from "@/components/drivers/AddDriverDialog";
import { Driver } from "@/types/driver";
import { toast } from "sonner";

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: "D001", name: "John Doe", licenseNumber: "DL12345", contactNumber: "555-1111", email: "john.doe@example.com", status: "active" },
    { id: "D002", name: "Jane Smith", licenseNumber: "DL67890", contactNumber: "555-2222", email: "jane.smith@example.com", status: "on-leave" },
    { id: "D003", name: "Peter Jones", licenseNumber: "DL11223", contactNumber: "555-3333", email: "peter.jones@example.com", status: "active" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const handleAddDriver = (newDriverData: Omit<Driver, "id">) => {
    const newDriver: Driver = {
      id: `D${(drivers.length + 1).toString().padStart(3, '0')}`, // Simple ID generation
      ...newDriverData,
    };
    setDrivers((prev) => [...prev, newDriver]);
    toast.success("Driver added successfully!");
  };

  const handleEditDriver = (driverToEdit: Driver) => {
    setEditingDriver(driverToEdit);
    setIsDialogOpen(true);
  };

  const handleSaveEditedDriver = (updatedDriverData: Omit<Driver, "id">) => {
    if (editingDriver) {
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === editingDriver.id ? { ...d, ...updatedDriverData } : d
        )
      );
      toast.success("Driver updated successfully!");
    }
    setEditingDriver(null);
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    toast.success("Driver deleted successfully!");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingDriver(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Drivers</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Driver
        </Button>
      </div>

      <p className="text-lg text-gray-700 mb-8">
        Manage your drivers and their assignments.
      </p>

      <DriverTable
        drivers={drivers}
        onEdit={handleEditDriver}
        onDelete={handleDeleteDriver}
      />

      <AddDriverDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={editingDriver ? handleSaveEditedDriver : handleAddDriver}
        editingDriver={editingDriver}
      />
    </div>
  );
};

export default Drivers;