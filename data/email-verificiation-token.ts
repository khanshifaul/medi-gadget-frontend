import { db } from "@/lib/db";

export const getEmailVerificationToken = async (
  identifier: string,
  isToken: boolean = true
) => {
  try {
    const emailVerificationToken = isToken
      ? await db.emailVerificationToken.findUnique({
          where: { token: identifier },
        })
      : await db.emailVerificationToken.findFirst({
          where: { email: identifier },
        });

    return emailVerificationToken;
  } catch (error) {
    console.error("Error fetching email verification token:", error);
    throw new Error("Failed to retrieve email verification token.");
  }
};
