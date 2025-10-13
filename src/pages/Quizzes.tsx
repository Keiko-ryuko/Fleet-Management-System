"use client";

import React, { useState } from "react";
import { Quiz } from "@/types/quiz";
import { QuizCard } from "@/components/quizzes/QuizCard";
import { toast } from "sonner";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "QZ001",
      title: "Algebra Basics Quiz",
      subject: "Mathematics",
      form: 1,
      description: "Test your understanding of fundamental algebraic concepts.",
      questionCount: 10,
      status: "available",
      language: "English",
    },
    {
      id: "QZ002",
      title: "Photosynthesis Assessment",
      subject: "Science",
      form: 2,
      description: "A short quiz on the process of photosynthesis.",
      questionCount: 8,
      status: "completed",
      score: 85,
      language: "English",
    },
    {
      id: "QZ003",
      title: "Shona Vocabulary Test",
      subject: "Shona",
      form: 1,
      description: "Assess your knowledge of basic Shona vocabulary.",
      questionCount: 15,
      status: "available",
      language: "Shona",
    },
    {
      id: "QZ004",
      title: "Ndebele Proverbs Quiz",
      subject: "Ndebele",
      form: 3,
      description: "Challenge yourself with common Ndebele proverbs and their meanings.",
      questionCount: 7,
      status: "in-progress",
      language: "Ndebele",
    },
    {
      id: "QZ005",
      title: "Chemical Bonding Quiz",
      subject: "Science",
      form: 4,
      description: "Advanced quiz on different types of chemical bonds.",
      questionCount: 12,
      status: "available",
      language: "English",
    },
  ]);

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
      </div>
    </div>
  );
};

export default Quizzes;