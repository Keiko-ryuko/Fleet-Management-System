"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Student } from "@/types/student"; // Assuming Student type is available

const Settings = () => {
  // Dummy student data for demonstration
  const [student, setStudent] = useState<Student>({
    id: "S001",
    name: "Tendai Moyo",
    grade: 3,
    language: "English", // Default language
    progress: [],
    recommendations: [],
  });

  const [preferredLanguage, setPreferredLanguage] = useState<Student["language"]>(student.language);

  const handleSaveSettings = () => {
    setStudent((prev) => ({ ...prev, language: preferredLanguage }));
    toast.success("Settings saved successfully!");
    console.log("Updated student language:", preferredLanguage);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your application preferences.
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">
              Preferred Language
            </Label>
            <Select
              value={preferredLanguage}
              onValueChange={(value: Student["language"]) => setPreferredLanguage(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Shona">Shona</SelectItem>
                <SelectItem value="Ndebele">Ndebele</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;