"use server";

import { getEmailVerificationToken } from "@/data/email-verificiation-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { UserAddressType } from "@prisma/client";

export const newVerification = async (token: string) => {
  const existingToken = await getEmailVerificationToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.emailVerificationToken.delete({
    where: { id: existingToken.id },
  });

  // Create blank user addresses for Home, Office, and Other
  const addressTypes: UserAddressType[] = [
    UserAddressType.HOME,
    UserAddressType.OFFICE,
    UserAddressType.OTHER,
  ];

  for (const type of addressTypes) {
    await db.userAddress.create({
      data: {
        userId: existingUser.id,
        type: type,
        address1: "",
        address2: null,
        state: "",
        city: "",
        postcode: 0,
        country: "",
      },
    });
  }

  return { success: "Email verified and addresses created!" };
};
