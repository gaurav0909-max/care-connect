"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { SignupFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FormFieldType } from "./PatientForm";

const SignupForm = () => {
  const router = useRouter();
  const { signup, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof SignupFormValidation>>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormValidation>) {
    setIsLoading(true);
    setError("");

    try {
      const result = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });

      if (result.success && user) {
        // Redirect to patient registration for full onboarding
        router.push(`/patients/${user.$id}/register`);
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Get Started</h1>
          <p className="text-dark-700">Create your account to book appointments</p>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="Gaurav Patel"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

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
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="(213) 373-4253"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Create a strong password"
          iconSrc="/assets/icons/email.svg"
          iconAlt="password icon"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="confirmPassword"
          label="Confirm Password"
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

        <SubmitButton isLoading={isLoading}>Create Account</SubmitButton>

        <div className="text-center text-sm">
          <p className="text-dark-700">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
