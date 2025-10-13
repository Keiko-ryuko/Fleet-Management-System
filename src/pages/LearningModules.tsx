"use client";

import React from "react";
import { ModuleCard } from "@/components/learning-modules/ModuleCard";
import { useStudent } from "@/context/StudentContext"; // Import useStudent hook
import { LearningModule } from "@/types/learning-module"; // Import LearningModule type

const LearningModules = () => {
  const { modules, downloadModule } = useStudent(); // Use modules and downloadModule from context

  const handleViewModule = (module: LearningModule) => {
    // In a real app, this would navigate to a module viewer page
    console.log("View module:", module);
    // For now, just a toast
    // toast.info(`Viewing module: ${module.title}`); // Removed as per previous instruction to avoid redundant toasts
  };

  const handleDownloadModule = (moduleToDownload: LearningModule) => {
    downloadModule(moduleToDownload.id); // Use context function
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