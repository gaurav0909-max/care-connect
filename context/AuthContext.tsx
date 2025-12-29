"use client";

import { createContext, useContext } from "react";

export interface User {
  $id: string;
  email: string;
  name: string;
  role: "patient" | "admin";
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { name: string; email: string; password: string; phone: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
