import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compareOTP } from "@/lib/otp";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified." },
        { status: 400 },
      );
    }

    if (!user.otpHash || !user.otpExpiry) {
      return NextResponse.json({ error: "OTP not found." }, { status: 400 });
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ error: "OTP has expired." }, { status: 400 });
    }
    if (user.otpAttempts >= 5) {
      return NextResponse.json(
        {
          error: "Too many incorrect OTP attempts. Please request a new OTP.",
        },
        { status: 429 },
      );
    }
    const isValidOTP = await compareOTP(otp, user.otpHash);

    if (!isValidOTP) {
      await prisma.user.update({
        where: { email },
        data: {
          otpAttempts: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
        otpHash: null,
        otpExpiry: null,
        otpAttempts: 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "OTP verification failed.",
      },
      { status: 500 },
    );
  }
}
