"use client";

import React, { useState } from "react";
import { LearningModule } from "@/types/learning-module";
import { ModuleCard } from "@/components/learning-modules/ModuleCard";
import { toast } from "sonner";

const LearningModules = () => {
  const [modules, setModules] = useState<LearningModule[]>([]); // Changed to empty array

  const handleViewModule = (module: LearningModule) => {
    toast.info(`Viewing module: ${module.title}`);
    // In a real app, this would navigate to a module viewer page
    console.log("View module:", module);
  };

  const handleDownloadModule = (moduleToDownload: LearningModule) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleToDownload.id ? { ...m, status: "updating" } : m
      )
    );
    toast.loading(`Downloading "${moduleToDownload.title}"...`, { id: moduleToDownload.id });

    // Simulate download time
    setTimeout(() => {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleToDownload.id ? { ...m, status: "downloaded" } : m
        )
      );
      toast.success(`"${moduleToDownload.title}" downloaded!`, { id: moduleToDownload.id });
    }, 3000); // 3 second simulated download
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Learning Modules</h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore and download curriculum-aligned content for your studies.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onView={handleViewModule}
            onDownload={handleDownloadModule}
          />
        ))}
        {modules.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No learning modules available.
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModules;