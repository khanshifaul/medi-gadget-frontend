import { UserProfile } from "@/components/protected/user-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const Settings = async () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <UserProfile />
    </div>
  );
};

export default Settings;
