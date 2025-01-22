import "@/app/globals.css";
import { siteMetadata } from "@/config/sites.config";
import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};
export type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export default AdminLayout;
