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

    const { idea } = await req.json();
    if (!idea) {
      return NextResponse.json(
        { error: "Project idea is required" },
        { status: 400 },
      );
    }
    const prompt = `
You are an expert software project planner.

Generate a project plan for:

"${idea}"

Return ONLY valid JSON.

Format:

{
  "projectName": "string",
  "description": "string",
  "tasks": [
    {
      "title": "string",
      "priority": "LOW | MEDIUM | HIGH"
    }
  ]
}

Generate between 5 and 10 tasks.

Do not return markdown.
Do not return explanations.
Return only JSON.
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    console.log(responseText);
    const projectPlan = JSON.parse(responseText);
    console.log(projectPlan.tasks);
    const project = await prisma.project.create({
      data: {
        name: projectPlan.projectName,
        description: projectPlan.description,

        userId: (authUser as any).userId,
      },
    });
    await prisma.task.createMany({
      data: projectPlan.tasks.map((task: any) => ({
        title: task.title,
        priority: task.priority,
        status: "TODO",
        projectId: project.id,
      })),
    });

    await prisma.aIProjectPlan.create({
      data: {
        idea,
        projectName: projectPlan.projectName,
        description: projectPlan.description,
        generatedTasks: projectPlan.tasks,
        userId: (authUser as any).userId,
      },
    });
    await prisma.activity.create({
      data: {
        type: "AI_PLAN",
        message: `Generated AI plan "${projectPlan.projectName}"`,
        userId: (authUser as any).userId,
      },
    });
    return NextResponse.json({
      success: true,
      project,
      tasksCreated: projectPlan.tasks.length,
      projectPlan,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate project plan" },
      { status: 500 },
    );
  }
}
