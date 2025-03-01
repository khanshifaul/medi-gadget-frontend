import { db } from "@/lib/db";

export const getTwoFactorConfirmation = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch (error) {
    console.error("Error fetching two-factor confirmation:", error);
    throw new Error("Failed to retrieve two-factor confirmation.");
  }
};
