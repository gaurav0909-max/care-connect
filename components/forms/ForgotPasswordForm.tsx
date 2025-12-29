"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { ForgotPasswordValidation } from "@/lib/validation";
import { sendPasswordReset } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { FormFieldType } from "./PatientForm";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordValidation>) {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await sendPasswordReset(values.email);

      if (result.success) {
        setSuccess(true);
        form.reset();
      } else {
        setError(result.error || "Failed to send reset email. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Forgot Password?</h1>
          <p className="text-dark-700">
            Enter your email and we'll send you a link to reset your password
          </p>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md text-sm">
            <p className="font-semibold">Check your email!</p>
            <p className="mt-1">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
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

        <SubmitButton isLoading={isLoading}>Send Reset Link</SubmitButton>

        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
