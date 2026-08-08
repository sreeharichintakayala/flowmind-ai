import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Planner History
    const plannerHistory = await prisma.aIProjectPlan.findMany({
      where: {
        userId: authUser.userId,
      },
    });

    // Workflow History
    const workflowHistory = await prisma.aIRequest.findMany({
      where: {
        userId: authUser.userId,
      },
    });

    const planner = plannerHistory.map((item) => ({
      id: item.id,
      type: "planner",

      projectName: item.projectName,

      description: item.description,

      idea: item.idea,

      createdAt: item.createdAt,
    }));

    const workflow = workflowHistory.map((item) => {
      const data = JSON.parse(item.response);

      return {
        id: item.id,

        type: "workflow",

        projectName: data.projectTitle,

        description:
          data.summary ?? data.description ?? "AI Generated Workflow",

        idea: item.prompt,

        createdAt: item.createdAt,
      };
    });

    const history = [...planner, ...workflow].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch history",
      },
      {
        status: 500,
      },
    );
  }
}
