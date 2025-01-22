"use server";

import { db } from "@/lib/db";
import { MessagesSchema } from "@/lib/zod";
import * as z from "zod";

export const sendMessage = async (values: z.infer<typeof MessagesSchema>) => {
  const validatedFields = MessagesSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, subject, message } = validatedFields.data;

  await db.messages.create({
    data: { name, email, subject, message },
  });

  return { success: "Message has been sent!" };
};
