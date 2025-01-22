import "@/app/globals.css";
import React from "react";
export type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
