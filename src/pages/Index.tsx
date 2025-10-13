"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Bot, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">
        Welcome to Your AI Learning Companion!
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
        Your personalized platform for interactive learning, quizzes, and AI-powered tutoring, designed to work seamlessly even offline.
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl w-full">
        <Card className="flex flex-col items-center p-6">
          <CardHeader>
            <LayoutDashboard className="h-12 w-12 text-blue-500 mb-4" />
            <CardTitle className="text-xl">Personalized Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track your progress and get tailored recommendations.
            </p>
            <Button asChild>
              <Link to="/student-dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center p-6">
          <CardHeader>
            <BookOpen className="h-12 w-12 text-green-500 mb-4" />
            <CardTitle className="text-xl">Learning Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access and download curriculum-aligned content.
            </p>
            <Button asChild>
              <Link to="/learning-modules">Explore Modules</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center p-6">
          <CardHeader>
            <Bot className="h-12 w-12 text-purple-500 mb-4" />
            <CardTitle className="text-xl">AI Tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant help and explanations in multiple languages.
            </p>
            <Button asChild>
              <Link to="/ai-tutor">Chat with AI Tutor</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;