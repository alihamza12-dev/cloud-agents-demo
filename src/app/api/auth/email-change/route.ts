import { NextRequest, NextResponse } from 'next/server';
import { validateEmailChange, type IEmailChangeRequest } from '@/features/auth';

export async function POST(request: NextRequest) {
  try {
    const body: IEmailChangeRequest = await request.json();

    const result = validateEmailChange(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email change request submitted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: ['Invalid request body'] },
      { status: 400 }
    );
  }
}
