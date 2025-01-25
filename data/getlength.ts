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

// Get the number of categories
export const getCategoryLength = cache(async (): Promise<number> => {
  try {
    const categoryCount = await db.productCategory.count();
    return categoryCount;
  } catch (error) {
    throw error;
  }
});

export const getOrderLength = cache(async (): Promise<number> => {
  try {
    const orderCount = await db.order.count();
    return orderCount;
  } catch (error) {
    throw error;
  }
});
