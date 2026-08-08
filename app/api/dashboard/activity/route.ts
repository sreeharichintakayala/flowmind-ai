import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const activities = await prisma.activity.findMany({
      where: {
        userId: (authUser as any).userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return NextResponse.json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch activites" },
      { status: 500 },
    );
  }
}
