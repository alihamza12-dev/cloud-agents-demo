import { NextRequest, NextResponse } from "next/server";
import type { IForgotPasswordRequest, IAuthApiResponse } from "@/features/auth/types";

export async function POST(request: NextRequest) {
  try {
    const body: IForgotPasswordRequest = await request.json();

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json<IAuthApiResponse>(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<IAuthApiResponse>(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Replace with actual password reset logic:
    // 1. Look up user by email
    // 2. Generate a secure reset token
    // 3. Store the token with an expiry (e.g., 1 hour)
    // 4. Send the reset email with the token link
    console.log(`Password reset requested for: ${body.email}`);

    return NextResponse.json<IAuthApiResponse>({
      success: true,
      message: "If an account exists for this email, a reset link has been sent.",
    });
  } catch {
    return NextResponse.json<IAuthApiResponse>(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }
}
