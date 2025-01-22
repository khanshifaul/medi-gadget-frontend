"use client";

import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const onClick = useCallback(async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className="text-destructive w-full"
    >
      {children}
    </Button>
  );
};
