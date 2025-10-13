"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { AddMaintenanceDialog } from "@/components/maintenance/AddMaintenanceDialog";
import { MaintenanceRecord } from "@/types/maintenance";
import { toast } from "sonner";

const Maintenance = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]); // Changed to empty array
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);

  const handleAddRecord = (newRecordData: Omit<MaintenanceRecord, "id">) => {
    const newRecord: MaintenanceRecord = {
      id: `M${(maintenanceRecords.length + 1).toString().padStart(3, '0')}`, // Simple ID generation
      ...newRecordData,
    };
    setMaintenanceRecords((prev) => [...prev, newRecord]);
    toast.success("Maintenance record added successfully!");
  };

  const handleEditRecord = (recordToEdit: MaintenanceRecord) => {
    setEditingRecord(recordToEdit);
    setIsDialogOpen(true);
  };

  const handleSaveEditedRecord = (updatedRecordData: Omit<MaintenanceRecord, "id">) => {
    if (editingRecord) {
      setMaintenanceRecords((prev) =>
        prev.map((r) =>
          r.id === editingRecord.id ? { ...r, ...updatedRecordData } : r
        )
      );
      toast.success("Maintenance record updated successfully!");
    }
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    setMaintenanceRecords((prev) => prev.filter((r) => r.id !== id));
    toast.success("Maintenance record deleted successfully!");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>

      <p className="text-lg text-gray-700 mb-8">
        Track and schedule vehicle maintenance.
      </p>

      <MaintenanceTable
        records={maintenanceRecords}
        onEdit={handleEditRecord}
        onDelete={handleDeleteRecord}
      />

      <AddMaintenanceDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={editingRecord ? handleSaveEditedRecord : handleAddRecord}
        editingRecord={editingRecord}
      />
    </div>
  );
};

export default Maintenance;