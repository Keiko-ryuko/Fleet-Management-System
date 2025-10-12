export interface StudentProgress {
  subject: string;
  currentScore: number;
  totalQuizzes: number;
  completedModules: number;
  totalModules: number;
}

export interface StudyRecommendation {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "module" | "quiz" | "resource";
  priority: "high" | "medium" | "low";
}

export interface Student {
  id: string;
  name: string;
  grade: number;
  language: "English" | "Shona" | "Ndebele";
  progress: StudentProgress[];
  recommendations: StudyRecommendation[];
}