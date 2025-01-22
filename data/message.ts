import { db } from "@/lib/db";
import { cache } from "react";

// Get message by ID
export const getMessageById = cache(async (id: string) => {
  try {
    const message = await db.messages.findUnique({
      where: { id },
    });
    return message;
  } catch (error) {
    throw new Error(
      `Failed to fetch message by ID: ${(error as Error).message}`
    );
  }
});

// Get all messages
export const getAllMessages = cache(async () => {
  try {
    const messages = await db.messages.findMany();
    return messages;
  } catch (error) {
    throw new Error(
      `Failed to fetch all messages: ${(error as Error).message}`
    );
  }
});

// Get messages by user email
export const getMessagesByUserEmail = cache(async (email: string) => {
  try {
    const messages = await db.messages.findMany({
      where: { email },
    });
    return messages;
  } catch (error) {
    throw new Error(
      `Failed to fetch messages by user email: ${(error as Error).message}`
    );
  }
});

// Get messages by subject
export const getMessagesBySubject = cache(async (subject: string) => {
  try {
    const messages = await db.messages.findMany({
      where: { subject },
    });
    return messages;
  } catch (error) {
    throw new Error(
      `Failed to fetch messages by subject: ${(error as Error).message}`
    );
  }
});
