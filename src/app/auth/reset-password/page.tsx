"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Invalid reset link</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          This password reset link is invalid or has expired.
        </p>
        <a
          href="/auth/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Request a new reset link
        </a>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<div className="p-6 text-center text-sm text-gray-500">Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
