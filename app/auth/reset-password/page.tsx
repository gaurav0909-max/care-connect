import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { redirect } from "next/navigation";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { userId?: string; secret?: string };
}) {
  // Ensure required params exist
  if (!searchParams.userId || !searchParams.secret) {
    redirect("/auth/forgot-password");
  }

  return (
    <ResetPasswordForm
      userId={searchParams.userId}
      secret={searchParams.secret}
    />
  );
}
