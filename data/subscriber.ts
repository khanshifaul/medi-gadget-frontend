import { db } from "@/lib/db";
import { cache } from "react";

// Get subscriber by email
export const getSubscriberByEmail = cache(async (email: string) => {
  try {
    const subscriber = await db.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (!subscriber) {
      throw new Error(`Subscriber with email ${email} not found.`);
    }
    return subscriber;
  } catch (error) {
    throw new Error(
      `Failed to fetch subscriber by email: ${(error as Error).message}`
    );
  }
});

// Get all subscribers
export const getAllSubscribers = cache(async () => {
  try {
    const subscribers = await db.newsletterSubscriber.findMany();
    return subscribers;
  } catch (error) {
    throw new Error(
      `Failed to fetch all subscribers: ${(error as Error).message}`
    );
  }
});

// Get subscribers by subscription date
export const getSubscribersBySubscriptionDate = cache(async (date: Date) => {
  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      where: {
        subscribedAt: {
          gte: date, // Get subscribers who subscribed on or after the specified date
        },
      },
    });
    return subscribers;
  } catch (error) {
    throw new Error(
      `Failed to fetch subscribers by subscription date: ${
        (error as Error).message
      }`
    );
  }
});

// Check if a subscriber exists by email
export const doesSubscriberExist = cache(async (email: string) => {
  try {
    const subscriber = await db.newsletterSubscriber.findUnique({
      where: { email },
    });
    return subscriber !== null; // Return true if subscriber exists, false otherwise
  } catch (error) {
    throw new Error(
      `Failed to check if subscriber exists: ${(error as Error).message}`
    );
  }
});
