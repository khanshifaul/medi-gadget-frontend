import { db } from "@/lib/db";
import { cache } from "react";

export const getSubscriberLength = cache(async (): Promise<number> => {
  try {
    const subscriberCount = await db.newsletterSubscriber.count();
    return subscriberCount;
  } catch (error) {
    throw error;
  }
});

export const getMessageLength = cache(async (): Promise<number> => {
  try {
    const messageCount = await db.messages.count();
    return messageCount;
  } catch (error) {
    throw error;
  }
});

export const getProductLength = cache(async (): Promise<number> => {
  try {
    const productCount = await db.product.count();
    return productCount;
  } catch (error) {
    throw error;
  }
});

export const getUserLength = cache(async (): Promise<number> => {
  try {
    const userCount = await db.user.count();
    return userCount;
  } catch (error) {
    throw error;
  }
});

export const getVerificationTokenLength = cache(async (): Promise<number> => {
  try {
    const verificationTokenCount = await db.emailVerificationToken.count();
    return verificationTokenCount;
  } catch (error) {
    throw error;
  }
});

export const getPasswordResetTokenLength = cache(async () => {
  try {
    const passwordResetTokenCount = await db.passwordResetToken.count();
    return passwordResetTokenCount;
  } catch (error) {
    return error;
  }
});
