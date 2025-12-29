"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, User } from "@/context/AuthContext";
import { account } from "@/lib/appwrite.client";
import {
  loginPatient,
  loginAdmin,
  signupPatient,
  logout as logoutAction,
} from "@/lib/actions/auth.actions";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await account.get();

      // Fetch user prefs to get role
      const userPrefs = currentUser.prefs as { role?: "patient" | "admin" };

      setUser({
        $id: currentUser.$id,
        email: currentUser.email,
        name: currentUser.name,
        role: userPrefs.role || "patient",
      });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    isAdmin = false
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = isAdmin
        ? await loginAdmin(email, password)
        : await loginPatient(email, password);

      if (result.success) {
        await checkAuth();
        return { success: true };
      }

      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signupPatient(data);

      if (result.success) {
        await checkAuth();
        return { success: true };
      }

      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
