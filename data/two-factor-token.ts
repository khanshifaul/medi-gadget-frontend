import { db } from "@/lib/db";

export const getTwoFactorToken = async (
  identifier: string,
  isToken: boolean = true
) => {
  try {
    const twoFactorToken = isToken
      ? await db.twoFactorToken.findUnique({
          where: { token: identifier },
        })
      : await db.twoFactorToken.findFirst({
          where: { email: identifier },
        });

    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token:", error);
    throw new Error("Failed to retrieve two-factor token.");
  }
};
