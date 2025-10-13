export interface Quiz {
  id: string;
  title: string;
  subject: string;
  form: number; // Corresponds to Form 1-4
  description: string;
  questionCount: number;
  status: "available" | "completed" | "in-progress";
  score?: number; // Optional, for completed quizzes
  language: "English" | "Shona" | "Ndebele";
}