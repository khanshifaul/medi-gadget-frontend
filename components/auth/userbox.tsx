import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/lib/hooks";

export const UserBox = () => {
  const user = useCurrentUser();

  return (
    <div className="flex items-center gap-2">
      <p className="text-right leading-4">
        <span>{user?.name}</span>
      </p>
      <UserButton />
    </div>
  );
};
