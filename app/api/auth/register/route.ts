import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "@/lib/mail";
import { generateOTP, hashOTP, getOTPExpiry } from "@/lib/otp";
// import { sendOTPEmail } from "@/lib/mail";
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 },
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already Exists" },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpHash = await hashOTP(otp);
    const otpExpiry = getOTPExpiry();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: false,

        otpHash,
        otpExpiry,
      },
    });
    await sendOTPEmail(email, otp);
    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration Failed" }, { status: 500 });
  }
}
