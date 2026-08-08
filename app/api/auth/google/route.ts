import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();
    console.log(credential);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return NextResponse.json(
        { error: "Invalid Google User" },
        { status: 400 },
      );
    }
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: payload.name || "Google User",
          email: payload.email,
        },
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );
    return NextResponse.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Google Login Failed",
      },
      {
        status: 500,
      },
    );
  }
}
