"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { LoginFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FormFieldType } from "./PatientForm";

const LoginForm = () => {
  const router = useRouter();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    setError("");

    try {
      const result = await login(values.email, values.password, isAdmin);

      if (result.success && user) {
        // Redirect based on role
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          // Check onboarding status from user prefs
          router.push(`/patients/${user.$id}/new-appointment`);
        }
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome back</h1>
          <p className="text-dark-700">
            {isAdmin ? "Admin login" : "Login to your account"}
          </p>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="your.email@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email icon"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Enter your password"
          iconSrc="/assets/icons/email.svg"
          iconAlt="password icon"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="isAdmin" className="text-sm text-dark-700">
            Login as Admin
          </label>
        </div>

        <SubmitButton isLoading={isLoading}>Login</SubmitButton>

        <div className="flex flex-col space-y-3 text-center text-sm">
          <Link
            href="/auth/forgot-password"
            className="text-green-500 hover:underline"
          >
            Forgot your password?
          </Link>
          <p className="text-dark-700">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
