"use client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { useState } from "react";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

const LogoutButton = ({ className, variant = "outline" }: LogoutButtonProps) => {
  const { logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      setIsLoading(true);
      await logout();
    }
  };

  if (!user) return null;

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
