import { UserProfile } from "@/components/protected/user-profile";
import UserPageBanner from "@/components/protected/user/user-page-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const UserDashboard = async () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <UserPageBanner title="My Profile" />
      <UserProfile />
    </div>
  );
};

export default UserDashboard;
