"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle, Loader2, BarChart } from "lucide-react";
import { Quiz } from "@/types/quiz";
import { toast } from "sonner";

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
  onViewResults: (quiz: Quiz) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  onStart,
  onViewResults,
}) => {
  const handleAction = () => {
    if (quiz.status === "available" || quiz.status === "in-progress") {
      onStart(quiz);
    } else if (quiz.status === "completed") {
      onViewResults(quiz);
    }
  };

  const getStatusBadge = () => {
    switch (quiz.status) {
      case "available":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Available</span>;
      case "completed":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Completed</span>;
      case "in-progress":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center"><Loader2 className="mr-1 h-3 w-3 animate-spin" /> In Progress</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{quiz.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {quiz.subject} - Form {quiz.form} ({quiz.language})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm mb-4 line-clamp-3">{quiz.description}</p>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Questions: {quiz.questionCount}</p>
          {quiz.status === "completed" && quiz.score !== undefined && (
            <p className="text-sm font-medium">Your Score: {quiz.score}%</p>
          )}
        </div>
        <Button className="w-full" onClick={handleAction}>
          {quiz.status === "available" && (
            <>
              <Play className="mr-2 h-4 w-4" /> Start Quiz
            </>
          )}
          {quiz.status === "in-progress" && (
            <>
              <Play className="mr-2 h-4 w-4" /> Continue Quiz
            </>
          )}
          {quiz.status === "completed" && (
            <>
              <BarChart className="mr-2 h-4 w-4" /> View Results
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};