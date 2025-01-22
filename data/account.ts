import { db } from "@/lib/db";

// Get account by user ID
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });
    return account;
  } catch (error) {
    console.error(
      `Failed to fetch account for user ID ${userId}: ${
        (error as Error).message
      }`
    );
    return null; // Return null if an error occurs
  }
};

// Get all accounts
export const getAllAccounts = async () => {
  try {
    const accounts = await db.account.findMany();
    return accounts;
  } catch (error) {
    console.error(`Failed to fetch all accounts: ${(error as Error).message}`);
    return null; // Return null if an error occurs
  }
};

// Get account by ID
export const getAccountById = async (accountId: string) => {
  try {
    const account = await db.account.findUnique({
      where: { id: accountId },
    });
    return account;
  } catch (error) {
    console.error(
      `Failed to fetch account by ID ${accountId}: ${(error as Error).message}`
    );
    return null; // Return null if an error occurs
  }
};

// Get accounts by provider
export const getAccountsByProvider = async (provider: string) => {
  try {
    const accounts = await db.account.findMany({
      where: { provider: provider },
    });
    return accounts;
  } catch (error) {
    console.error(
      `Failed to fetch accounts by provider ${provider}: ${
        (error as Error).message
      }`
    );
    return null; // Return null if an error occurs
  }
};
