"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};