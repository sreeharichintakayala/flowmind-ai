import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { buildWorkflowPrompt } from "@/lib/prompts/workflowPrompt";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AIRequest, Milestone, Risk, Task, Timeline } from "@prisma/client";

interface Workflow {
  projectTitle: string;
  summary: string;
  tasks: Task[];
  milestones: Milestone[];
  timeline: Timeline[];
  risks: Risk[];
  aiRequest: AIRequest[];
  recommendedTech: string[];
}
export async function POST(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, industry, complexity, duration, techStack } =
      await req.json();

    if (!title || !description) {
      return NextResponse.json(
        {
          error: "Title and description are required",
        },
        { status: 400 },
      );
    }
    console.log({
      title,
      description,
      industry,
      complexity,
      duration,
      techStack,
    });
    const prompt = buildWorkflowPrompt({
      title,
      description,
      industry,
      complexity,
      duration,
      techStack,
    });

    const result = await model.generateContent(prompt);
    console.log("========== PROMPT ==========");
    console.log(prompt);
    console.log("============================");
    const response = result.response.text();
    console.log("RAW GEMINI RESPONSE");
    console.log(response);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const workflow: Workflow = JSON.parse(cleaned);
    console.log(workflow.projectTitle);
    // Validate AI response
    if (!workflow.tasks || !Array.isArray(workflow.tasks)) {
      return NextResponse.json(
        { error: "Invalid AI workflow response" },
        { status: 500 },
      );
    }

    const project = await prisma.$transaction(async (tx) => {
      // Create Project
      const project = await tx.project.create({
        data: {
          name: title,
          description,
          industry,
          complexity,
          duration,
          summary: workflow.summary,
          userId: authUser.userId,
        },
      });

      // Create Tasks
      await tx.task.createMany({
        data: workflow.tasks.map((task: any) => ({
          title: task.title,
          priority: task.priority,
          status: task.status,
          projectId: project.id,
        })),
      });

      // Create Milestones
      if (workflow.milestones?.length) {
        await tx.milestone.createMany({
          data: workflow.milestones.map((milestone: any) => ({
            title: milestone.title,
            projectId: project.id,
          })),
        });
      }

      // Create Timeline
      if (workflow.timeline?.length) {
        await tx.timeline.createMany({
          data: workflow.timeline.map((item: any) => ({
            week: item.week,
            description: item.description,
            projectId: project.id,
          })),
        });
      }

      // Create Risks
      if (workflow.risks?.length) {
        await tx.risk.createMany({
          data: workflow.risks.map((risk: any) => ({
            description: risk.description,
            severity: risk.severity,
            projectId: project.id,
          })),
        });
      }

      // Save AI History
      await tx.aIRequest.create({
        data: {
          prompt: description,
          response: JSON.stringify(workflow),
          userId: authUser.userId,
        },
      });
      await tx.techStack.createMany({
        data: techStack.map((tech: string) => ({
          name: tech,
          projectId: project.id,
        })),
      });

      return project;
    });

    return NextResponse.json({
      success: true,
      message: "Workflow generated successfully",
      projectId: project.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Workflow generation failed",
      },
      {
        status: 500,
      },
    );
  }
}
