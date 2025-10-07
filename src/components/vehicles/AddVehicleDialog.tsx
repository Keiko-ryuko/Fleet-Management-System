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
import { Vehicle } from "@/types/vehicle";
import { toast } from "sonner";

interface AddVehicleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Omit<Vehicle, "id">) => void;
  editingVehicle?: Vehicle | null;
}

export const AddVehicleDialog: React.FC<AddVehicleDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingVehicle,
}) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vin, setVin] = useState("");
  const [status, setStatus] = useState<Vehicle["status"]>("active");
  const [mileage, setMileage] = useState(""); // New state for mileage

  useEffect(() => {
    if (editingVehicle) {
      setMake(editingVehicle.make);
      setModel(editingVehicle.model);
      setYear(editingVehicle.year.toString());
      setLicensePlate(editingVehicle.licensePlate);
      setVin(editingVehicle.vin);
      setStatus(editingVehicle.status);
      setMileage(editingVehicle.mileage.toString()); // Set mileage for editing
    } else {
      setMake("");
      setModel("");
      setYear("");
      setLicensePlate("");
      setVin("");
      setStatus("active");
      setMileage(""); // Clear mileage for new vehicle
    }
  }, [editingVehicle, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!make || !model || !year || !licensePlate || !vin || !mileage) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newVehicle: Omit<Vehicle, "id"> = {
      make,
      model,
      year: parseInt(year),
      licensePlate,
      vin,
      status,
      mileage: parseInt(mileage), // Parse mileage
    };
    onSave(newVehicle);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
          <DialogDescription>
            {editingVehicle ? "Make changes to the vehicle details here." : "Fill in the details for the new vehicle."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="make" className="text-right">
              Make
            </Label>
            <Input
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="licensePlate" className="text-right">
              License Plate
            </Label>
            <Input
              id="licensePlate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vin" className="text-right">
              VIN
            </Label>
            <Input
              id="vin"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mileage" className="text-right">
              Mileage
            </Label>
            <Input
              id="mileage"
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value: Vehicle["status"]) => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">{editingVehicle ? "Save Changes" : "Add Vehicle"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};