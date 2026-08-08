"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlannerDetailsProps {
  plan: any;
}

export default function PlannerDetails({ plan }: PlannerDetailsProps) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl p-8">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => router.push("/dashboard")}
          className="hover:text-blue-600"
        >
          Dashboard
        </button>

        <span>/</span>

        <button
          onClick={() => router.push("/ai-history")}
          className="hover:text-blue-600"
        >
          AI History
        </button>

        <span>/</span>

        <span className="text-gray-300">{plan.projectName}</span>
      </div>
      <h1 className="mb-4 text-5xl font-bold">{plan.projectName}</h1>

      <div className=" text-black mb-6 rounded-xl bg-purple-100 p-4 ">
        <h2 className="mb-2 font-semibold text-slate-700">Original Idea</h2>

        <p>{plan.idea}</p>
      </div>

      <div className="rounded-xl text-black bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">Description</h2>

        <p>{plan.description}</p>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Generated Tasks</h2>
        <div className="space-y-4">
          {!plan.generatedTasks ? (
            <p className="text-gray-500">
              Tasks were not stored for this older AI plan.
            </p>
          ) : (
            plan.generatedTasks?.map((task: any, index: number) => (
              <div key={index} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span>{task.title}</span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      task.priority === "HIGH"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <p className="mt-6 text-gray-500">
        Created on {new Date(plan.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
