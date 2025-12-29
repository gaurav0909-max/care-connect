import { cookies } from "next/headers";
import { account } from "@/lib/appwrite.client";

const SESSION_COOKIE = "careconnect_session";

export interface SessionData {
  userId: string;
  sessionId: string;
  email: string;
  role: "patient" | "admin";
  expiresAt: Date;
}

/**
 * Create a new session and store it in HTTP-only cookie
 * @param userId - Appwrite user ID
 * @param sessionId - Appwrite session ID
 * @param email - User email
 * @param role - User role (patient or admin)
 */
export async function createSession(
  userId: string,
  sessionId: string,
  email: string,
  role: "patient" | "admin"
): Promise<void> {
  const cookieStore = cookies();

  const sessionData: SessionData = {
    userId,
    sessionId,
    email,
    role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };

  cookieStore.set(SESSION_COOKIE, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/",
  });
}

/**
 * Delete the current session (logout)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);

  try {
    // Also delete the session from Appwrite
    await account.deleteSession("current");
  } catch {
    // Session might already be deleted on Appwrite side
  }
}

/**
 * Refresh the current session with Appwrite
 * @returns Session data or null if invalid
 */
export async function refreshSession() {
  try {
    const session = await account.getSession("current");
    return session;
  } catch {
    return null;
  }
}
