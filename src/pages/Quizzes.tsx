"use client";

import React from "react";
import { QuizCard } from "@/components/quizzes/QuizCard";
import { useStudent } from "@/context/StudentContext"; // Import useStudent hook
import { Quiz } from "@/types/quiz"; // Import Quiz type

const Quizzes = () => {
  const { quizzes, startQuiz, completeQuiz } = useStudent(); // Use quizzes and actions from context

  const handleStartQuiz = (quizToStart: Quiz) => {
    startQuiz(quizToStart.id); // Use context function
    // In a real app, this would navigate to a quiz-taking interface
    console.log("Start quiz:", quizToStart);
    // For demonstration, let's simulate completion after a delay
    setTimeout(() => {
      const score = Math.floor(Math.random() * 101); // Random score between 0 and 100
      completeQuiz(quizToStart.id, score);
    }, 5000); // Simulate quiz taking for 5 seconds
  };

  const handleViewResults = (quizToView: Quiz) => {
    // In a real app, this would navigate to a results display page
    console.log("View results:", quizToView);
    // toast.info(`Viewing results for: ${quizToView.title}`); // Removed as per previous instruction to avoid redundant toasts
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