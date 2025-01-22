import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { getEmailVerificationToken } from "@/data/email-verificiation-token";
import { getPasswordResetToken } from "@/data/password-reset-token";
import { getTwoFactorToken } from "@/data/two-factor-token";
import { db } from "@/lib/db";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorToken(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetToken(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getEmailVerificationToken(email);

  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const emailVerficationToken = await db.emailVerificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return emailVerficationToken;
};
