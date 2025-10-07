"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceRecord } from "@/types/maintenance";
import { toast } from "sonner";

interface AddMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<MaintenanceRecord, "id">) => void;
  editingRecord?: MaintenanceRecord | null;
}

export const AddMaintenanceDialog: React.FC<AddMaintenanceDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingRecord,
}) => {
  const [vehicleId, setVehicleId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState<MaintenanceRecord["status"]>("scheduled");

  useEffect(() => {
    if (editingRecord) {
      setVehicleId(editingRecord.vehicleId);
      setDescription(editingRecord.description);
      setDate(editingRecord.date);
      setCost(editingRecord.cost.toString());
      setStatus(editingRecord.status);
    } else {
      setVehicleId("");
      setDescription("");
      setDate("");
      setCost("");
      setStatus("scheduled");
    }
  }, [editingRecord, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleId || !description || !date || !cost) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newRecord: Omit<MaintenanceRecord, "id"> = {
      vehicleId,
      description,
      date,
      cost: parseFloat(cost),
      status,
    };
    onSave(newRecord);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingRecord ? "Edit Maintenance Record" : "Add New Maintenance Record"}</DialogTitle>
          <DialogDescription>
            {editingRecord ? "Make changes to the maintenance record here." : "Fill in the details for the new maintenance record."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleId" className="text-right">
              Vehicle ID
            </Label>
            <Input
              id="vehicleId"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Cost
            </Label>
            <Input
              id="cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="col-span-3"
              required
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value: MaintenanceRecord["status"]) => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">{editingRecord ? "Save Changes" : "Add Record"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};