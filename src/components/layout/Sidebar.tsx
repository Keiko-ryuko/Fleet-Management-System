"use client";

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Car,
  Users,
  Gauge,
  Wrench,
  ScrollText,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/vehicles", label: "Vehicles", icon: Car },
  { href: "/drivers", label: "Drivers", icon: Users },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/reports", label: "Reports", icon: ScrollText },
];

const SidebarContent = () => (
  <nav className="flex flex-col gap-2 p-4">
    <h2 className="text-lg font-semibold mb-4 text-sidebar-primary-foreground">Fleet Manager</h2>
    {navItems.map((item) => (
      <NavLink
        key={item.href}
        to={item.href}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary-foreground",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground"
          )
        }
      >
        <item.icon className="h-5 w-5" />
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export const Sidebar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-sidebar">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <SidebarContent />
    </div>
  );
};