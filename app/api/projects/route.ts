import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const authuser = getAuthUser(req);
  if (!authuser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await prisma.project.findMany({
    where: {
      userId: (authuser as any).userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({
    success: true,
    projects,
  });
}
export async function POST(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, description } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 },
      );
    }
    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: authUser.userId,
      },
    });
    await prisma.activity.create({
      data: {
        type: "PROJECT_CREATED",
        message: `Created project "${project.name}"`,
        userId: (authUser as any).userId,
      },
    });
    return NextResponse.json(
      {
        success: true,
        project,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
