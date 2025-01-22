"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};
