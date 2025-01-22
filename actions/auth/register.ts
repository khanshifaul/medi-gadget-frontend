"use server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { sendVerificationEmail } from "@/lib/mail";
import { generateEmailVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/lib/zod";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email already in use!" };
    }

    // Hash the password using the hashPassword function
    const hashedPassword = await hashPassword(password);

    // Create the new user in the database
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate a verification token and send the verification email
    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to register user. Please try again." };
  }
};
