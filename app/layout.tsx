import { auth } from "@/auth";
import { Providers } from "@/components/apollo-provider";
import { StoreProvider } from "@/components/store-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteMetadata } from "@/config/sites.config";
import { SessionProvider } from "next-auth/react";

import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export type RootLayoutProps = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <StoreProvider>{children}</StoreProvider>
              <Toaster />
            </ThemeProvider>
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
