"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Flag,
  CalendarDays,
  AlertTriangle,
  ClipboardList,
  Download,
  RefreshCcw,
  Bot,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface WorkflowDetailsProps {
  workflow: any;
}

export default function WorkflowDetails({ workflow }: WorkflowDetailsProps) {
  const router = useRouter();

  const data = workflow.response;

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Back */}
      <button
        onClick={() => router.push("/ai-history")}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to History
      </button>

      {/* Hero */}
      {/* <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
        <div className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm">
          🤖 AI Workflow
        </div>

        <h1 className="text-4xl font-bold">AI Generated Workflow</h1>

        <p className="mt-4 max-w-4xl text-lg text-blue-100">{data.summary}</p>

        <div className="mt-6 text-blue-100">
          Generated on {new Date(workflow.createdAt).toLocaleDateString()}
        </div>
      </div>  */}
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
              <Bot size={16} />
              AI Powered Workflow
            </span>

            <h1 className="mt-5 text-5xl font-bold">{data.projectTitle}</h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
              {data.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100 ">
              <div
                className="flex items-center gap-2 bg-white/10
rounded-full
px-4 py-2"
              >
                <CalendarDays size={18} />
                {new Date(workflow.createdAt).toLocaleDateString()}
              </div>

              <div
                className="flex items-center gap-2 bg-white/10
rounded-full
px-4 py-2"
              >
                <ClipboardList size={18} />
                {data.tasks.length} Tasks
              </div>

              <div
                className="flex items-center gap-2 bg-white/10
rounded-full
px-4 py-2"
              >
                <Flag size={18} />
                {data.milestones.length} Milestones
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex gap-3">
            <button
              disabled
              className="flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 font-medium backdrop-blur transition hover:bg-white/30 bg-white/10
rounded-full
px-4 py-2"
            >
              <Download size={18} />
              Export PDF
            </button>

            <button
              disabled
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium  transition hover:bg-white/30 text-indigo-900 bg-white/10
rounded-full
px-4 py-2"
            >
              <RefreshCcw size={18} />
              Regenerate
            </button>
          </div>
        </div>
      </div>
      {/* Stats */}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 text-slate-700">
        <div className="rounded-2xl bg-white p-6 shadow">
          <ClipboardList className="mb-3 text-blue-600" />
          <p className="text-sm text-slate-500">Tasks</p>
          <h2 className="text-4xl font-bold">{data.tasks.length}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <Flag className="mb-3 text-green-600" />
          <p className="text-sm text-slate-500">Milestones</p>
          <h2 className="text-4xl font-bold">{data.milestones.length}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CalendarDays className="mb-3 text-orange-500" />
          <p className="text-sm text-slate-500">Timeline</p>
          <h2 className="text-4xl font-bold">{data.timeline.length}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <AlertTriangle className="mb-3 text-red-500" />
          <p className="text-sm text-slate-500">Risks</p>
          <h2 className="text-4xl font-bold">{data.risks.length}</h2>
        </div>
      </div>

      {/* Tasks */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow text-slate-700">
        <h2 className="mb-6 text-3xl font-bold">📋 AI Generated Tasks</h2>

        <div className="space-y-4">
          {data.tasks.map((task: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border p-5"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={22} />

                <span className="font-medium">{task.title}</span>
              </div>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  task.priority === "HIGH"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow text-slate-700">
        <h2 className="mb-6 text-3xl font-bold">🎯 Milestones</h2>

        <div className="space-y-4">
          {data.milestones.map((milestone: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border-l-4 border-green-500 bg-slate-50 p-5"
            >
              {milestone.title}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow text-slate-700">
        <h2 className="mb-6 text-3xl font-bold">📅 Timeline</h2>

        <div className="space-y-4">
          {data.timeline.map((item: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border-l-4 border-blue-500 bg-blue-50 p-5"
            >
              <h3 className="font-bold">{item.week}</h3>

              <p className="mt-2 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow text-slate-700">
        <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          Risk Analysis
        </h2>

        <div className="space-y-4">
          {data.risks.map((risk: any, index: number) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-xl border-l-4 p-5 shadow-sm transition hover:shadow-md ${
                risk.severity === "HIGH"
                  ? "border-red-500 bg-red-50"
                  : risk.severity === "MEDIUM"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-green-500 bg-green-50"
              }`}
            >
              <span>{risk.description}</span>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  risk.severity === "HIGH"
                    ? "bg-red-100 text-red-600"
                    : risk.severity === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {risk.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
