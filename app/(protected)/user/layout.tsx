import "@/app/globals.css";
import React from "react";

export type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return <div className="overscroll-none">{children}</div>;
};

export default UserLayout;
