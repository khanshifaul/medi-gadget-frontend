import authConfig from "@/config/auth.config";
import {
  ADMIN_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  userRoutes,
} from "@/config/routes.config";
import { currentUser } from "@/lib/auth";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

// Convert wildcard routes to regular expressions
const convertToRegex = (route: string) => {
  const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regexString = `^${escapedRoute.replace(/\\\*/g, ".*")}$`;
  return new RegExp(regexString);
};

// Convert public routes to regex
const publicRouteRegexes = publicRoutes.map(convertToRegex);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRouteRegexes.some((regex) =>
    regex.test(nextUrl.pathname)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const loggedInUser = await currentUser();
  const isAdmin = loggedInUser?.role === "ADMIN";
  const isUser = loggedInUser?.role === "USER";
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isUserRoute = nextUrl.pathname.startsWith(userRoutes);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (isAdmin) {
        return Response.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl));
      }
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isAdminRoute) {
    if (!isAdmin) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
    return;
  }

  if (isUserRoute) {
    if (!isUser) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
