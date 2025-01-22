"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export function SidebarToggler() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="p-2">
      <Menu className="h-5 w-5" />
    </button>
  );
}
