"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Student } from "@/types/student";

const Profile = () => {
  // Dummy student data (can be fetched from state or API in a real app)
  const [student] = useState<Student>({
    id: "S001",
    name: "Tendai Moyo",
    grade: 3, // Corresponds to Form 3
    language: "Shona",
    progress: [], // Not displayed on profile, but part of the type
    recommendations: [], // Not displayed on profile, but part of the type
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
      <p className="text-lg text-gray-700 mb-8">
        View and manage your personal information.
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={student.name} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="grade" className="text-right">
              Grade (Form)
            </Label>
            <Input id="grade" value={`Form ${student.grade}`} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">
              Preferred Language
            </Label>
            <Input id="language" value={student.language} readOnly className="col-span-3" />
          </div>
          {/* Add more profile fields as needed */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;