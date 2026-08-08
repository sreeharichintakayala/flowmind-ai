import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (authUser as any).userId;
    const projectsCount = await prisma.project.count({
      where: {
        userId,
      },
    });
    const tasks = await prisma.task.findMany({
      where: {
        project: {
          userId,
        },
      },
    });
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "COMPLETED",
    ).length;
    const inProgressTasks = tasks.filter(
      (task) => task.status === "IN_PROGRESS",
    ).length;
    const todoTasks = tasks.filter((task) => task.status === "TODO").length;
    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "HIGH",
    ).length;
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const recentProjects = await prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    const insights: string[] = [];
    if (highPriorityTasks > 0) {
      insights.push(
        `⚠️ You have ${highPriorityTasks} high-priority tasks that need attention.`,
      );
    }
    if (completedTasks > 0) {
      insights.push(
        `✅ Great work! You've completed ${completedTasks} tasks so far.`,
      );
    }
    if (inProgressTasks > 0) {
      insights.push(`🚀 ${inProgressTasks} tasks are currently in progress.`);
    }
    if (todoTasks > 20) {
      insights.push(
        `📋 You have a large backlog of pending tasks. Consider prioritizing them.`,
      );
    }
    if (projectsCount === 0) {
      insights.push(`💡 Create your first project and let AI generate a plan.`);
    }
    if (completedTasks === totalTasks && totalTasks > 0) {
      insights.push(`🎉 Amazing! All your tasks are completed.`);
    }
    const latestProjects = await prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    const activities = latestProjects.map((project) => ({
      id: project.id,
      message: `Created project "${project.name}"`,
      createdAt: project.createdAt,
    }));
    return NextResponse.json({
      success: true,
      analytics: {
        projectsCount,
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        highPriorityTasks,
        completionRate,
      },
      recentProjects,
      insights,
      activities,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard" },
      { status: 500 },
    );
  }
}
