/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/api/graphql",
  "/auth/new-verification",
  "/auth/email-verification",
  "/shop",
  "/shop/*",
  "/blog",
  "/blog/*",
  "/contact",
  "/ambulance",
  "/payment",
  "/privacy",
  "/terms",
  "/return",
];

/**
 * An array of routes that aren't accessible to the public
 * These routes do require authentication
 * @type {string}
 */
export const adminRoutes = "/admin";

/**
 * An array of routes that are used for authentication
 * These routes will accessed by Users Only
 * @type {string}
 */
export const userRoutes = "/user";

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/user";
export const ADMIN_LOGIN_REDIRECT = "/admin";
