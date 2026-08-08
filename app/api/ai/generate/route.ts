import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    await prisma.aIRequest.create({
      data: {
        prompt,
        response,
        userId: (authUser as any).userId,
      },
    });
    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 },
    );
  }
}
