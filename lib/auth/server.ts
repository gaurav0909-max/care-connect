import { cookies } from "next/headers";
import { users } from "@/lib/appwrite.config";

const SESSION_COOKIE = "careconnect_session";

export interface SessionData {
  userId: string;
  sessionId: string;
  email: string;
  role: "patient" | "admin";
  expiresAt: Date;
}

/**
 * Get the current session from cookies
 * @returns Session data or null if no valid session
 */
export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);

    if (!sessionCookie) return null;

    const sessionData: SessionData = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (new Date(sessionData.expiresAt) < new Date()) {
      return null;
    }

    return sessionData;
  } catch {
    return null;
  }
}

/**
 * Get user role from Appwrite user preferences
 * @param userId - Appwrite user ID
 * @returns User role or null
 */
export async function getUserRole(
  userId: string
): Promise<"admin" | "patient" | null> {
  try {
    const user = await users.get(userId);
    return (user.prefs?.role as "admin" | "patient") || null;
  } catch {
    return null;
  }
}

/**
 * Check if user has admin role
 * @param userId - Appwrite user ID
 * @returns True if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === "admin";
}

/**
 * Check if user has patient role
 * @param userId - Appwrite user ID
 * @returns True if user is patient
 */
export async function isPatient(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === "patient";
}
