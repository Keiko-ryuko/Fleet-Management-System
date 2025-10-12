"use client";

import React, { useState } from "react";
import { ProgressCard } from "@/components/student-dashboard/ProgressCard";
import { RecommendationCard } from "@/components/student-dashboard/RecommendationCard";
import { Student } from "@/types/student";

const StudentDashboard = () => {
  // Dummy student data
  const [student] = useState<Student>({
    id: "S001",
    name: "Tendai Moyo",
    grade: 3, // Corresponds to Form 3
    language: "Shona",
    progress: [
      { subject: "Mathematics", currentScore: 750, totalQuizzes: 10, completedModules: 5, totalModules: 8 },
      { subject: "Science", currentScore: 620, totalQuizzes: 8, completedModules: 4, totalModules: 7 },
      { subject: "English", currentScore: 800, totalQuizzes: 12, completedModules: 7, totalModules: 10 },
    ],
    recommendations: [
      { id: "rec001", title: "Review Algebra Basics", description: "You struggled with the last algebra quiz. Review Module 3.", link: "/learning-modules/math/algebra-basics", type: "module", priority: "high" },
      { id: "rec002", title: "Practice Photosynthesis Quiz", description: "Strengthen your understanding of plant biology.", link: "/learning-modules/science/photosynthesis-quiz", type: "quiz", priority: "medium" },
      { id: "rec003", title: "Explore New Vocabulary", description: "Expand your English vocabulary with new words.", link: "/learning-modules/english/vocabulary-builder", type: "resource", priority: "low" },
    ],
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome, {student.name}!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your personalized learning journey awaits.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {student.progress.map((p) => (
            <ProgressCard key={p.subject} progress={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Study Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {student.recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;