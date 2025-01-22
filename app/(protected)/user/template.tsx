"use client";

import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/protected/app-sidebar";
import UserHeader from "@/components/protected/user/user-header";
import { SidebarProvider } from "@/components/ui/sidebar";

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <SidebarProvider>
      <AppSidebar role="user" />
      <main className="w-full flex flex-col gap-5">
        <UserHeader />
        <div className="flex gap-3 p-2">
          <Card className="w-full min-h-[90vh] p-4">{children}</Card>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Template;
