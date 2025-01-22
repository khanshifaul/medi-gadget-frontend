"use client";

import AdminHeader from "@/components/protected/admin/admin-header";
import { AppSidebar } from "@/components/protected/app-sidebar";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <SidebarProvider>
      <AppSidebar role="admin" />
      <main className="w-full flex flex-col gap-5">
        <AdminHeader />
        <div className="flex gap-3 p-2">
          <Card className="w-full min-h-[90vh] p-4">{children}</Card>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Template;
