"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
interface Task {
  title: string;
  priority: string;
}
interface ProjectPlan {
  projectName: string;
  description: string;
  tasks: Task[];
}

export default function AIPlannerPage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const generatePlan = async () => {
    if (!idea.trim()) {
      alert("Please enter a project idea");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/ai/project-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idea,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProjectPlan(data.projectPlan);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <main className="min-w-0 w-full pt-16 md:ml-64 md:w-[calc(100%-16rem)] md:pt-0">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900">
            AI Project Planner
          </h1>

          <p className="mt-2 text-slate-500">
            Describe your idea and let AI build the project plan.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg text-slate-700">
          <label className="mb-3 block text-lg font-semibold">
            Project Idea
          </label>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={6}
            placeholder="Build a food delivery application..."
            className="w-full text-slate-500 rounded-2xl border border-slate-300 p-4 outline-none focus:border-blue-500"
          />

          <button
            onClick={generatePlan}
            disabled={loading}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        {showSuccess && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            🎉 Project created successfully and tasks have been added
            automatically.
          </div>
        )}
        {projectPlan && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-slate-900">
                {projectPlan.projectName}
              </h2>

              <p className="mt-3 text-slate-600">{projectPlan.description}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-2xl font-bold text-slate-900">
                Generated Tasks
              </h3>
            </div>

            <div className="space-y-4">
              {projectPlan.tasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">
                      {task.title}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium
                      ${
                        task.priority === "HIGH"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
