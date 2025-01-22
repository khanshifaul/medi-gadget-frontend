"use client";

import { useCurrentRole } from "@/lib/hooks";
import { UserRole } from "@prisma/client";
import { useEffect } from "react";
import { toast } from "sonner";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  useEffect(() => {
    if (role !== allowedRole) {
      toast.error("You do not have permission to view this content!");
    }
  }, [role, allowedRole]);

  if (role !== allowedRole) {
    return null; // Return null to prevent rendering children
  }

  return <>{children}</>;
};
