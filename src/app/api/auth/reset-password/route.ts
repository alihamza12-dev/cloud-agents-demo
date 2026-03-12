import { NextRequest, NextResponse } from "next/server";
import type { IResetPasswordRequest, IAuthApiResponse } from "@/features/auth/types";

export async function POST(request: NextRequest) {
  try {
    const body: IResetPasswordRequest = await request.json();

    if (!body.token || typeof body.token !== "string") {
      return NextResponse.json<IAuthApiResponse>(
        { success: false, message: "Reset token is required." },
        { status: 400 }
      );
    }

    if (!body.password || typeof body.password !== "string") {
      return NextResponse.json<IAuthApiResponse>(
        { success: false, message: "Password is required." },
        { status: 400 }
      );
    }

    if (body.password.length < 8) {
      return NextResponse.json<IAuthApiResponse>(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // TODO: Replace with actual reset logic:
    // 1. Validate the token exists and hasn't expired
    // 2. Hash the new password
    // 3. Update the user's password in the database
    // 4. Invalidate the reset token
    // 5. Optionally invalidate existing sessions
    console.log(`Password reset with token: ${body.token}`);

    return NextResponse.json<IAuthApiResponse>({
      success: true,
      message: "Your password has been reset successfully.",
    });
  } catch {
    return NextResponse.json<IAuthApiResponse>(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }
}
