"use client";

import React, { useState } from "react";
import { Quiz } from "@/types/quiz";
import { QuizCard } from "@/components/quizzes/QuizCard";
import { toast } from "sonner";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // Changed to empty array

  const handleStartQuiz = (quizToStart: Quiz) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizToStart.id ? { ...q, status: "in-progress" } : q
      )
    );
    toast.info(`Starting quiz: ${quizToStart.title}`);
    // In a real app, this would navigate to a quiz-taking interface
    console.log("Start quiz:", quizToStart);
  };

  const handleViewResults = (quizToView: Quiz) => {
    toast.info(`Viewing results for: ${quizToView.title}`);
    // In a real app, this would navigate to a results display page
    console.log("View results:", quizToView);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
      <p className="text-lg text-gray-700 mb-8">
        Test your knowledge with interactive quizzes.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onStart={handleStartQuiz}
            onViewResults={handleViewResults}
          />
        ))}
        {quizzes.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No quizzes available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;