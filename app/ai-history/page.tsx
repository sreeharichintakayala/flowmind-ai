"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

interface AIProjectHistory {
  id: string;
  type: "planner" | "workflow";
  idea: string;
  projectName: string;
  description: string;
  createdAt: string;
}

export default function AIHistoryPage() {
  const [history, setHistory] = useState<AIProjectHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/ai/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setHistory(data.history);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading AI History...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <main className="min-w-0 w-full pt-16 md:ml-64 md:w-[calc(100%-16rem)] md:pt-0">
        <div className="flex-1 p-10">
          <h1 className="text-5xl font-bold text-slate-900">AI History</h1>
          <p className="mt-2 text-slate-500">
            View all AI Planner and AI Workflow generations in one place..
          </p>
          <div className="mt-4">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
              {history.length} Plans Generated
            </span>
          </div>
        </div>
        {history.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="mb-4 text-6xl">🤖</div>
            <h2 className="text-3xl font-bold text-slate-800">
              No AI Plans Yet
            </h2>
            <p className="mt-3 text-slate-500">
              Generate your first AI project plan to see it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((plan) => (
              <Link
                key={plan.id}
                href={`/ai-history/${plan.id}`}
                className="block"
              >
                <div
                  className="
rounded-3xl
bg-white
p-8
shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:shadow-2xl
"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">
                        {plan.projectName}
                      </h2>

                      <p className="mt-3 text-slate-600">{plan.description}</p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        plan.type === "planner"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {plan.type === "planner"
                        ? "🧠 AI Planner"
                        : "🤖 AI Workflow"}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                    <h3 className="font-semibold text-slate-800">
                      Original Idea
                    </h3>

                    <p className="mt-2 text-slate-600">{plan.idea}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Created on {new Date(plan.createdAt).toLocaleDateString()}
                    </span>

                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
