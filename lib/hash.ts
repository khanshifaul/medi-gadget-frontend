import bcrypt from "bcryptjs";

/**
 * Hash a password using bcrypt with a salt generated from a customizable length.
 * @param password The plain password to be hashed.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Ensure AUTH_SECRET is available in the environment
    const authSecret = process.env.AUTH_SECRET;
    if (!authSecret) {
      throw new Error("AUTH_SECRET environment variable is not defined");
    }

    // Use salt rounds from environment (default to 10 if not defined)
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

    // Generate salt and hash the password combined with AUTH_SECRET
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password + authSecret, salt);

    return hashedPassword;
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV !== "production") {
      console.error("Error hashing password:", error);
    }
    throw new Error("Error hashing password");
  }
};

/**
 * Compare a plain password with a hashed password using bcrypt.
 * @param password The plain password.
 * @param hashedPassword The hashed password.
 * @returns True if the passwords match, otherwise false.
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const authSecret = process.env.AUTH_SECRET;
    if (!authSecret) {
      throw new Error("AUTH_SECRET environment variable is not defined");
    }

    const isMatch = await bcrypt.compare(password + authSecret, hashedPassword);
    return isMatch;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error comparing passwords:", error);
    }
    throw new Error("Error comparing passwords");
  }
};
