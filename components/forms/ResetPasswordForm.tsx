"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { ResetPasswordValidation } from "@/lib/validation";
import { resetPassword } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormFieldType } from "./PatientForm";

interface ResetPasswordFormProps {
  userId: string;
  secret: string;
}

const ResetPasswordForm = ({ userId, secret }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordValidation>>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordValidation>) {
    setIsLoading(true);
    setError("");

    try {
      const result = await resetPassword(userId, secret, values.password);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setError(
          result.error || "Invalid or expired reset link. Please request a new one."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Password Reset Successful!</h1>
          <p className="text-dark-700">
            Your password has been successfully reset. Redirecting to login...
          </p>
        </section>
        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md text-sm">
          <p>You can now login with your new password.</p>
        </div>
        <Link
          href="/auth/login"
          className="block text-center text-green-500 hover:underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Reset Password</h1>
          <p className="text-dark-700">Enter your new password below</p>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="New Password"
          placeholder="Create a strong password"
          iconSrc="/assets/icons/email.svg"
          iconAlt="password icon"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter your password"
          iconSrc="/assets/icons/email.svg"
          iconAlt="password icon"
        />

        <div className="text-xs text-dark-700 space-y-1">
          <p>Password must contain:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
          </ul>
        </div>

        <SubmitButton isLoading={isLoading}>Reset Password</SubmitButton>

        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
