"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Loader2 } from "lucide-react";
import { LearningModule } from "@/types/learning-module";
import { toast } from "sonner";

interface ModuleCardProps {
  module: LearningModule;
  onView: (module: LearningModule) => void;
  onDownload: (module: LearningModule) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onView,
  onDownload,
}) => {
  const handleAction = () => {
    if (module.status === "available") {
      onDownload(module);
    } else {
      onView(module);
    }
  };

  const getStatusBadge = () => {
    switch (module.status) {
      case "downloaded":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Downloaded</span>;
      case "available":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Available</span>;
      case "updating":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center"><Loader2 className="mr-1 h-3 w-3 animate-spin" /> Updating</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{module.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {module.subject} - Form {module.form} ({module.language})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm mb-4 line-clamp-3">{module.description}</p>
        <Button className="w-full" onClick={handleAction} disabled={module.status === "updating"}>
          {module.status === "available" ? (
            <>
              <Download className="mr-2 h-4 w-4" /> Download
            </>
          ) : module.status === "updating" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Downloading...
            </>
          ) : (
            <>
              <BookOpen className="mr-2 h-4 w-4" /> View Module
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};