"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/lib/hooks";
import { CircleUserRound, Cog, LogOut } from "lucide-react"; // Import icons from lucide-react
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const router = useRouter();
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8">
          <Avatar className="h-8 w-8 rounded">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="rounded-none bg-transparent">
              <CircleUserRound className="text-foreground text-xl" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="grid gap-1">
        <DropdownMenuItem className="p-0">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              router.push(user && user.role === "ADMIN" ? "/admin" : "/user/");
            }}
          >
            <Cog className="h-4 w-4 mr-2" />
            {user?.role === "ADMIN" ? "Dashboard" : "Profile"}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <LogoutButton>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
