import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
// Get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }
    return user;
  } catch (error) {
    console.error(`Failed to fetch user by email: ${(error as Error).message}`);
    return null; // Return null if an error occurs
  }
};

// Get user by ID
export const getUserById = async (id: string | undefined) => {
  try {
    if (!id) {
      throw new Error("User ID is required.");
    }
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return user;
  } catch (error) {
    console.error(`Failed to fetch user by ID: ${(error as Error).message}`);
    return null; // Return null if an error occurs
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.error(`Failed to fetch all users: ${(error as Error).message}`);
    return null; // Return null if an error occurs
  }
};

// Get users by role
export const getUsersByRole = async (role: UserRole) => {
  // Change type to UserRole
  try {
    const users = await db.user.findMany({
      where: { role },
    });
    return users;
  } catch (error) {
    console.error(
      `Failed to fetch users by role ${role}: ${(error as Error).message}`
    );
    return null; // Return null if an error occurs
  }
};

// Check if a user exists by email
export const doesUserExist = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user !== null; // Return true if user exists, false otherwise
  } catch (error) {
    console.error(
      `Failed to check if user exists: ${(error as Error).message}`
    );
    return false; // Return false if an error occurs
  }
};
