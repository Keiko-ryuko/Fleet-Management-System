"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, UserPlus } from "lucide-react"; // Added UserPlus icon
import { Vehicle } from "@/types/vehicle";
import { Driver } from "@/types/driver"; // Import Driver type

interface VehicleTableProps {
  vehicles: Vehicle[];
  drivers: Driver[]; // Pass drivers to resolve names
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onAssignDriver: (vehicle: Vehicle) => void; // New prop for assigning drivers
}

export const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  drivers,
  onEdit,
  onDelete,
  onAssignDriver,
}) => {
  const getDriverName = (driverId?: string) => {
    if (!driverId) return "Unassigned";
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? driver.name : "Unknown Driver";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>Mileage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Driver</TableHead> {/* New column */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center"> {/* Updated colspan */}
                No vehicles found.
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>{vehicle.vin}</TableCell>
                <TableCell>{vehicle.mileage.toLocaleString()} miles</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      vehicle.status === "active"
                        ? "bg-green-100 text-green-800"
                        : vehicle.status === "maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{getDriverName(vehicle.assignedDriverId)}</TableCell> {/* Display assigned driver */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAssignDriver(vehicle)} // New assign driver button
                    className="mr-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="sr-only">Assign Driver</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(vehicle)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};