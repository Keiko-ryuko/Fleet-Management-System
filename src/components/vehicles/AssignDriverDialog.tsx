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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Driver } from "@/types/driver";
import { Vehicle } from "@/types/vehicle";
import { toast } from "sonner";

interface AssignDriverDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (vehicleId: string, driverId: string | null) => void;
  vehicleToAssign: Vehicle | null;
  drivers: Driver[];
}

export const AssignDriverDialog: React.FC<AssignDriverDialogProps> = ({
  isOpen,
  onClose,
  onAssign,
  vehicleToAssign,
  drivers,
}) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleToAssign) {
      setSelectedDriverId(vehicleToAssign.assignedDriverId || null);
    } else {
      setSelectedDriverId(null);
    }
  }, [vehicleToAssign, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleToAssign) {
      onAssign(vehicleToAssign.id, selectedDriverId);
      onClose();
    } else {
      toast.error("No vehicle selected for assignment.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {vehicleToAssign ? `Assign Driver to ${vehicleToAssign.make} ${vehicleToAssign.model}` : "Assign Driver"}
          </DialogTitle>
          <DialogDescription>
            Select a driver to assign to this vehicle, or unassign the current driver.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="driver" className="text-right">
              Driver
            </Label>
            <Select
              value={selectedDriverId || ""}
              onValueChange={(value) => setSelectedDriverId(value === "" ? null : value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassign Driver</SelectItem>
                {drivers.map((driver) => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Save Assignment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};