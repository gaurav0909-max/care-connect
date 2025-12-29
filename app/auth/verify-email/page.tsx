"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail, resendVerification } from "@/lib/actions/auth.actions";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    async function verify() {
      if (!userId || !secret) {
        setStatus("error");
        setError("Invalid verification link. Missing required parameters.");
        return;
      }

      try {
        const result = await verifyEmail(userId, secret);

        if (result.success) {
          setStatus("success");
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        } else {
          setStatus("error");
          setError(result.error || "Invalid or expired verification link.");
        }
      } catch (err) {
        setStatus("error");
        setError("An unexpected error occurred during verification.");
        console.error("Email verification error:", err);
      }
    }

    verify();
  }, [userId, secret, router]);

  const handleResend = async () => {
    setIsResending(true);
    try {
      const result = await resendVerification();
      if (result.success) {
        alert("Verification email sent! Please check your inbox.");
      } else {
        alert(result.error || "Failed to resend verification email.");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="mb-12 space-y-4">
        <h1 className="header">Email Verification</h1>
        {status === "loading" && (
          <p className="text-dark-700">Verifying your email address...</p>
        )}
        {status === "success" && (
          <p className="text-dark-700">Your email has been verified successfully!</p>
        )}
        {status === "error" && (
          <p className="text-dark-700">Email verification failed</p>
        )}
      </section>

      {status === "loading" && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md text-sm">
            <p className="font-semibold">Email Verified!</p>
            <p className="mt-1">
              Your email has been successfully verified. You can now login to your account.
            </p>
            <p className="mt-2 text-xs">Redirecting to login in 3 seconds...</p>
          </div>
          <Link
            href="/auth/login"
            className="block text-center text-green-500 hover:underline"
          >
            Go to Login Now
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
            <p className="font-semibold">Verification Failed</p>
            <p className="mt-1">{error}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-dark-700 text-center">
              Your verification link may have expired. You can request a new one:
            </p>
            <SubmitButton isLoading={isResending} onClick={handleResend}>
              Resend Verification Email
            </SubmitButton>
          </div>

          <div className="text-center text-sm">
            <Link href="/auth/login" className="text-green-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
