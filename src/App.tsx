import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/layout/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import LearningModules from "./pages/LearningModules";
import AITutor from "./pages/AITutor"; // Import the new AI Tutor page
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Quizzes from "./pages/Quizzes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="student-dashboard" element={<StudentDashboard />} />
            <Route path="learning-modules" element={<LearningModules />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="ai-tutor" element={<AITutor />} /> {/* New route for AI Tutor */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;