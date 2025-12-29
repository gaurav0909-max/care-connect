"use server";

import { account } from "@/lib/appwrite.client";
import { users } from "@/lib/appwrite.config";
import { createSession, deleteSession } from "@/lib/auth/session";
import { ID } from "node-appwrite";

interface AuthResult {
  success: boolean;
  userId?: string;
  error?: string;
}

/**
 * Sign up a new patient
 * @param data - Patient signup data (name, email, password, phone)
 * @returns Auth result with success status and user ID
 */
export async function signupPatient(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}): Promise<AuthResult> {
  try {
    // Create Appwrite Auth user
    const user = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.name
    );

    // Set user preferences (role and phone)
    await users.updatePrefs(user.$id, {
      role: "patient",
      phone: data.phone,
      emailVerified: false,
      onboardingComplete: false,
    });

    // Send verification email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await account.createVerification(`${appUrl}/auth/verify-email`);

    // Create session
    const session = await account.createEmailPasswordSession(
      data.email,
      data.password
    );
    await createSession(user.$id, session.$id, data.email, "patient");

    return { success: true, userId: user.$id };
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle specific Appwrite errors
    if (error.code === 409) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to create account. Please try again.",
    };
  }
}

/**
 * Login a patient
 * @param email - Patient email
 * @param password - Patient password
 * @returns Auth result with success status and user ID
 */
export async function loginPatient(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    // Get user details to verify role
    const user = await users.get(session.userId);

    if (user.prefs?.role !== "patient") {
      await account.deleteSession(session.$id);
      return {
        success: false,
        error: "Invalid email or password.",
      };
    }

    await createSession(session.userId, session.$id, email, "patient");

    return { success: true, userId: session.userId };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Invalid email or password. Please try again.",
    };
  }
}

/**
 * Login an admin
 * @param email - Admin email
 * @param password - Admin password
 * @returns Auth result with success status and user ID
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    // Verify admin role
    const user = await users.get(session.userId);

    if (user.prefs?.role !== "admin") {
      await account.deleteSession(session.$id);
      return {
        success: false,
        error: "Admin access required. Please use the patient login.",
      };
    }

    await createSession(session.userId, session.$id, email, "admin");

    return { success: true, userId: session.userId };
  } catch (error: any) {
    console.error("Admin login error:", error);
    return {
      success: false,
      error: "Invalid credentials. Please try again.",
    };
  }
}

/**
 * Logout the current user
 * @returns Auth result with success status
 */
export async function logout(): Promise<AuthResult> {
  try {
    await deleteSession();
    return { success: true };
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: "Failed to logout. Please try again.",
    };
  }
}

/**
 * Send password reset email
 * @param email - User email
 * @returns Auth result with success status
 */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await account.createRecovery(email, `${appUrl}/auth/reset-password`);

    return { success: true };
  } catch (error: any) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: "Failed to send reset email. Please try again.",
    };
  }
}

/**
 * Reset password with recovery token
 * @param userId - User ID from recovery link
 * @param secret - Secret token from recovery link
 * @param password - New password
 * @returns Auth result with success status
 */
export async function resetPassword(
  userId: string,
  secret: string,
  password: string
): Promise<AuthResult> {
  try {
    await account.updateRecovery(userId, secret, password);

    return { success: true };
  } catch (error: any) {
    console.error("Password update error:", error);
    return {
      success: false,
      error: "Invalid or expired reset link. Please request a new one.",
    };
  }
}

/**
 * Verify email with verification token
 * @param userId - User ID from verification link
 * @param secret - Secret token from verification link
 * @returns Auth result with success status
 */
export async function verifyEmail(
  userId: string,
  secret: string
): Promise<AuthResult> {
  try {
    await account.updateVerification(userId, secret);

    // Update user prefs to mark email as verified
    await users.updatePrefs(userId, {
      emailVerified: true,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Email verification error:", error);
    return {
      success: false,
      error: "Invalid verification link. Please try again.",
    };
  }
}

/**
 * Resend verification email
 * @returns Auth result with success status
 */
export async function resendVerification(): Promise<AuthResult> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await account.createVerification(`${appUrl}/auth/verify-email`);

    return { success: true };
  } catch (error: any) {
    console.error("Resend verification error:", error);
    return {
      success: false,
      error: "Failed to resend verification email. Please try again.",
    };
  }
}
