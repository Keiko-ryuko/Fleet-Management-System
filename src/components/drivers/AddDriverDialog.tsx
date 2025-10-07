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
import { Driver } from "@/types/driver";
import { toast } from "sonner";

interface AddDriverDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (driver: Omit<Driver, "id">) => void;
  editingDriver?: Driver | null;
}

export const AddDriverDialog: React.FC<AddDriverDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingDriver,
}) => {
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Driver["status"]>("active");

  useEffect(() => {
    if (editingDriver) {
      setName(editingDriver.name);
      setLicenseNumber(editingDriver.licenseNumber);
      setContactNumber(editingDriver.contactNumber);
      setEmail(editingDriver.email);
      setStatus(editingDriver.status);
    } else {
      setName("");
      setLicenseNumber("");
      setContactNumber("");
      setEmail("");
      setStatus("active");
    }
  }, [editingDriver, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !licenseNumber || !contactNumber || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newDriver: Omit<Driver, "id"> = {
      name,
      licenseNumber,
      contactNumber,
      email,
      status,
    };
    onSave(newDriver);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingDriver ? "Edit Driver" : "Add New Driver"}</DialogTitle>
          <DialogDescription>
            {editingDriver ? "Make changes to the driver details here." : "Fill in the details for the new driver."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="licenseNumber" className="text-right">
              License No.
            </Label>
            <Input
              id="licenseNumber"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactNumber" className="text-right">
              Contact No.
            </Label>
            <Input
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value: Driver["status"]) => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">{editingDriver ? "Save Changes" : "Add Driver"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};