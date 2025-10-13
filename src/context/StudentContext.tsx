"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect, // Import useEffect
} from "react";
import { Student, StudentProgress, StudyRecommendation } from "@/types/student";
import { LearningModule } from "@/types/learning-module";
import { Quiz } from "@/types/quiz";
import { toast } from "sonner";

// Define the shape of the context data
interface StudentContextType {
  student: Student;
  modules: LearningModule[];
  quizzes: Quiz[];
  updateStudent: (newStudent: Partial<Student>) => void;
  updateModule: (updatedModule: LearningModule) => void;
  addModule: (newModule: Omit<LearningModule, "id">) => void;
  deleteModule: (moduleId: string) => void;
  updateQuiz: (updatedQuiz: Quiz) => void;
  addQuiz: (newQuiz: Omit<Quiz, "id">) => void;
  deleteQuiz: (quizId: string) => void;
  downloadModule: (moduleId: string) => void;
  startQuiz: (quizId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
}

// Create the context
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Define the props for the provider
interface StudentProviderProps {
  children: ReactNode;
}

// Initial dummy data (will be loaded from localStorage if available)
const initialStudent: Student = {
  id: "S001",
  name: "Guest Student",
  grade: 3,
  language: "English",
  progress: [
    {
      subject: "Mathematics",
      currentScore: 750,
      totalQuizzes: 10,
      completedModules: 5,
      totalModules: 8,
    },
    {
      subject: "Science",
      currentScore: 600,
      totalQuizzes: 8,
      completedModules: 4,
      totalModules: 7,
    },
  ],
  recommendations: [
    {
      id: "rec1",
      title: "Algebra Basics Module",
      description: "Review fundamental algebraic concepts.",
      link: "/learning-modules",
      type: "module",
      priority: "high",
    },
    {
      id: "rec2",
      title: "Photosynthesis Quiz",
      description: "Test your knowledge on plant biology.",
      link: "/quizzes",
      type: "quiz",
      priority: "medium",
    },
  ],
};

const initialModules: LearningModule[] = [
  {
    id: "mod1",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    form: 3,
    description:
      "This module covers the basic principles of algebra, including variables, expressions, and simple equations.",
    contentUrl: "/content/algebra-intro.pdf",
    status: "available",
    language: "English",
  },
  {
    id: "mod2",
    title: "The Water Cycle",
    subject: "Science",
    form: 2,
    description:
      "Learn about the continuous movement of water on, above, and below the surface of the Earth.",
    contentUrl: "/content/water-cycle.pdf",
    status: "downloaded",
    language: "English",
  },
  {
    id: "mod3",
    title: "Shona Greetings",
    subject: "Shona",
    form: 1,
    description:
      "A beginner's guide to common greetings and phrases in Shona.",
    contentUrl: "/content/shona-greetings.pdf",
    status: "available",
    language: "Shona",
  },
];

const initialQuizzes: Quiz[] = [
  {
    id: "quiz1",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    form: 3,
    description: "A short quiz to test your understanding of basic algebra.",
    questionCount: 10,
    status: "available",
    language: "English",
  },
  {
    id: "quiz2",
    title: "Biology: Cells",
    subject: "Science",
    form: 2,
    description: "Test your knowledge on the structure and function of cells.",
    questionCount: 15,
    status: "completed",
    score: 85,
    language: "English",
  },
  {
    id: "quiz3",
    title: "Ndebele Phrases",
    subject: "Ndebele",
    form: 1,
    description: "Quiz on common Ndebele phrases and their meanings.",
    questionCount: 8,
    status: "in-progress",
    language: "Ndebele",
  },
];

// Create the provider component
export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}) => {
  // Initialize state from localStorage or use initial dummy data
  const [student, setStudent] = useState<Student>(() => {
    if (typeof window !== "undefined") {
      const savedStudent = localStorage.getItem("student");
      return savedStudent ? JSON.parse(savedStudent) : initialStudent;
    }
    return initialStudent;
  });

  const [modules, setModules] = useState<LearningModule[]>(() => {
    if (typeof window !== "undefined") {
      const savedModules = localStorage.getItem("modules");
      return savedModules ? JSON.parse(savedModules) : initialModules;
    }
    return initialModules;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    if (typeof window !== "undefined") {
      const savedQuizzes = localStorage.getItem("quizzes");
      return savedQuizzes ? JSON.parse(savedQuizzes) : initialQuizzes;
    }
    return initialQuizzes;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("student", JSON.stringify(student));
    }
  }, [student]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("modules", JSON.stringify(modules));
    }
  }, [modules]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    }
  }, [quizzes]);

  const updateStudent = useCallback((newStudent: Partial<Student>) => {
    setStudent((prev) => ({ ...prev, ...newStudent }));
  }, []);

  const updateModule = useCallback((updatedModule: LearningModule) => {
    setModules((prev) =>
      prev.map((m) => (m.id === updatedModule.id ? updatedModule : m))
    );
  }, []);

  const addModule = useCallback((newModuleData: Omit<LearningModule, "id">) => {
    const newModule: LearningModule = {
      id: `mod${modules.length + 1}`,
      ...newModuleData,
    };
    setModules((prev) => [...prev, newModule]);
  }, [modules.length]);

  const deleteModule = useCallback((moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  }, []);

  const downloadModule = useCallback((moduleId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, status: "updating" } : m
      )
    );
    toast.loading(`Downloading module...`, { id: moduleId });

    setTimeout(() => {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, status: "downloaded" } : m
        )
      );
      toast.success(`Module downloaded!`, { id: moduleId });
    }, 3000);
  }, []);

  const updateQuiz = useCallback((updatedQuiz: Quiz) => {
    setQuizzes((prev) =>
      prev.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q))
    );
  }, []);

  const addQuiz = useCallback((newQuizData: Omit<Quiz, "id">) => {
    const newQuiz: Quiz = {
      id: `quiz${quizzes.length + 1}`,
      ...newQuizData,
    };
    setQuizzes((prev) => [...prev, newQuiz]);
  }, [quizzes.length]);

  const deleteQuiz = useCallback((quizId: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
  }, []);

  const startQuiz = useCallback((quizId: string) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId ? { ...q, status: "in-progress" } : q
      )
    );
    toast.info("Quiz started!");
  }, []);

  const completeQuiz = useCallback((quizId: string, score: number) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId ? { ...q, status: "completed", score } : q
      )
    );
    toast.success("Quiz completed!");
  }, []);

  const contextValue: StudentContextType = {
    student,
    modules,
    quizzes,
    updateStudent,
    updateModule,
    addModule,
    deleteModule,
    downloadModule,
    updateQuiz,
    addQuiz,
    deleteQuiz,
    startQuiz,
    completeQuiz,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the student context
export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};