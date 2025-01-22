"use client";

import GuestFooter from "@/components/common/hw-footer";
import GuestHeader from "@/components/common/hw-header";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";

interface templateProps {
  children: ReactNode;
}

const Template = ({ children }: templateProps) => {
  return (
    <div>
      <Suspense
        fallback={
          <Skeleton className="bg-muted rounded min-h-[50vh] min-w-[90vw]" />
        }
      >
        <GuestHeader />
      </Suspense>
      <main>{children}</main>
      <GuestFooter />
    </div>
  );
};

export default Template;
