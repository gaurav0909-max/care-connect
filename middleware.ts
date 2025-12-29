import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, getUserRole } from "./lib/auth/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/reset-password", "/auth/verify-email"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // API routes are public
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const session = await getSession();

  if (!session || !session.userId) {
    // Not authenticated, redirect to login
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const role = await getUserRole(session.userId);

    if (role !== "admin") {
      // Not an admin, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  }

  // Protect patient routes (/patients/[userId]/*)
  if (pathname.startsWith("/patients")) {
    // Extract userId from path: /patients/[userId]/...
    const pathParts = pathname.split("/");
    const urlUserId = pathParts[2]; // /patients/[userId]/register -> pathParts[2] is userId

    // Verify user is accessing their own data
    if (urlUserId !== session.userId) {
      // User trying to access someone else's data, redirect to their own profile
      const correctedPath = pathname.replace(
        `/patients/${urlUserId}`,
        `/patients/${session.userId}`
      );
      return NextResponse.redirect(new URL(correctedPath, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
