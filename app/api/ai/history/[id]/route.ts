import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const planner = await prisma.aIProjectPlan.findUnique({
      where: {
        id,
      },
    });
    if (planner) {
      return NextResponse.json({
        success: true,
        type: "planner",
        data: planner,
      });
    }
    const workflow = await prisma.aIRequest.findUnique({
      where: {
        id,
      },
    });
    if (workflow) {
      return NextResponse.json({
        success: true,
        type: "workflow",
        data: {
          ...workflow,
          response: JSON.parse(workflow.response),
        },
      });
    }
    return NextResponse.json(
      {
        error: "Plan Not found",
      },
      {
        status: 404,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch plan" },
      { status: 500 },
    );
  }
}
