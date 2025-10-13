"use client";

import React, { useState } from "react";
import { ProgressCard } from "@/components/student-dashboard/ProgressCard";
import { RecommendationCard } from "@/components/student-dashboard/RecommendationCard";
import { Student } from "@/types/student";

const StudentDashboard = () => {
  // Dummy student data
  const [student] = useState<Student>({
    id: "",
    name: "Guest Student",
    grade: 0,
    language: "English",
    progress: [], // Changed to empty array
    recommendations: [], // Changed to empty array
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
        {student.progress.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No progress data available. Start exploring modules and quizzes!</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Study Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {student.recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
        {student.recommendations.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No recommendations at this time. Keep learning to get personalized suggestions!</p>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;