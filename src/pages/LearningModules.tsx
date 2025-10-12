"use client";

import React, { useState } from "react";
import { LearningModule } from "@/types/learning-module";
import { ModuleCard } from "@/components/learning-modules/ModuleCard";
import { toast } from "sonner";

const LearningModules = () => {
  const [modules, setModules] = useState<LearningModule[]>([
    {
      id: "LM001",
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      form: 1,
      description: "An introductory module covering basic algebraic expressions, equations, and inequalities.",
      contentUrl: "/content/math/algebra-fundamentals.pdf",
      status: "downloaded",
      language: "English",
    },
    {
      id: "LM002",
      title: "Photosynthesis in Plants",
      subject: "Science",
      form: 2,
      description: "Explore how plants convert light energy into chemical energy through photosynthesis.",
      contentUrl: "/content/science/photosynthesis.html",
      status: "available",
      language: "English",
    },
    {
      id: "LM003",
      title: "Shona Grammar Basics",
      subject: "Shona",
      form: 1,
      description: "Learn the foundational grammar rules and sentence structures in Shona.",
      contentUrl: "/content/shona/grammar-basics.pdf",
      status: "available",
      language: "Shona",
    },
    {
      id: "LM004",
      title: "Ndebele Culture & History",
      subject: "Ndebele",
      form: 3,
      description: "A deep dive into the rich cultural heritage and history of the Ndebele people.",
      contentUrl: "/content/ndebele/culture-history.mp4",
      status: "available",
      language: "Ndebele",
    },
    {
      id: "LM005",
      title: "Chemical Reactions",
      subject: "Science",
      form: 4,
      description: "Understanding different types of chemical reactions and balancing equations.",
      contentUrl: "/content/science/chemical-reactions.pdf",
      status: "downloaded",
      language: "English",
    },
    {
      id: "LM006",
      title: "Geometry and Shapes",
      subject: "Mathematics",
      form: 2,
      description: "An interactive module on geometric shapes, angles, and measurements.",
      contentUrl: "/content/math/geometry.html",
      status: "available",
      language: "English",
    },
  ]);

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
      </div>
    </div>
  );
};

export default LearningModules;