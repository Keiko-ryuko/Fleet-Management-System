"use client";

import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to the student dashboard as the default landing page
  return <Navigate to="/student-dashboard" replace />;
};

export default Index;