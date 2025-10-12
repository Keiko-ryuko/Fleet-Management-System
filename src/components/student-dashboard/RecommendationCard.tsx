"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StudyRecommendation } from "@/types/student";

interface RecommendationCardProps {
  recommendation: StudyRecommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  const getPriorityColor = (priority: StudyRecommendation["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{recommendation.title}</CardTitle>
        <p className={`text-xs font-semibold ${getPriorityColor(recommendation.priority)}`}>
          Priority: {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)}
        </p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>
        <Button variant="outline" className="w-full" asChild>
          <a href={recommendation.link}>
            Start {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};