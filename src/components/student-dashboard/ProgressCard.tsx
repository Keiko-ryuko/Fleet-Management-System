"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StudentProgress } from "@/types/student";

interface ProgressCardProps {
  progress: StudentProgress;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  const moduleCompletion = (progress.completedModules / progress.totalModules) * 100;
  const quizScorePercentage = (progress.currentScore / (progress.totalQuizzes * 100)) * 100; // Assuming max 100 per quiz

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{progress.subject}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Modules Completed: {progress.completedModules}/{progress.totalModules}</p>
          <Progress value={moduleCompletion} className="h-2" />
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Overall Quiz Score: {progress.currentScore} / {progress.totalQuizzes * 100}</p>
          <Progress value={quizScorePercentage} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">
          Keep up the great work!
        </p>
      </CardContent>
    </Card>
  );
};