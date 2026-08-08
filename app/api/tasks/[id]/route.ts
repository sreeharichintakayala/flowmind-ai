import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const { status } = await req.json();

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    if (task.project.userId !== (authUser as any).userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        status,
        completed: status === "COMPLETED",
      },
    });
    await prisma.activity.create({
      data: {
        type: "TASK_COMPLETED",
        message: `Completed task "${task.title}"`,
        userId: (authUser as any).userId,
      },
    });
    return NextResponse.json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    if (task.project.userId !== (authUser as any).userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
