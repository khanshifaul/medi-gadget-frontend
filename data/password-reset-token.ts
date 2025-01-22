import { db } from "@/lib/db";

export const getPasswordResetToken = async (
  identifier: string,
  isToken: boolean = true
) => {
  try {
    const passwordResetToken = isToken
      ? await db.passwordResetToken.findUnique({
          where: { token: identifier },
        })
      : await db.passwordResetToken.findFirst({
          where: { email: identifier },
        });

    return passwordResetToken;
  } catch (error) {
    console.error("Error fetching password reset token:", error);
    throw new Error("Failed to retrieve password reset token.");
  }
};
