"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Brain,
  Layers,
  CalendarDays,
  Code2,
  Sparkles,
  Bot,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIWorkflowPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [industry, setIndustry] = useState("Software");

  const [complexity, setComplexity] = useState("Medium");

  const [duration, setDuration] = useState("3 Months");
  const estimatedTasks =
    complexity === "Small" ? 12 : complexity === "Medium" ? 24 : 40;

  const estimatedMilestones =
    complexity === "Small" ? 3 : complexity === "Medium" ? 7 : 12;
  const [techStack, setTechStack] = useState<string[]>([]);
  const technologies = [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Spring Boot",
    "Java",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Docker",
    "Redis",
    "Tailwind CSS",
    "TypeScript",
  ];
  const toggleTechnology = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };
  const applyTemplate = (template: (typeof templates)[0]) => {
    setTitle(template.title);
    setDescription(template.description);
    setIndustry(template.industry);
    setComplexity(template.complexity);
    setDuration(template.duration);
    setTechStack(template.techStack);
  };

  const templates = [
    {
      icon: "🚀",
      name: "SaaS",
      title: "Project Management SaaS",
      description:
        "Authentication, subscriptions, dashboards, analytics and AI workflow automation.",
      industry: "Software",
      complexity: "Enterprise",
      duration: "6 Months",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    },
    {
      icon: "🍔",
      name: "Food Delivery",
      title: "Food Delivery Platform",
      description:
        "Customer, restaurant, delivery partner, payments and live tracking.",
      industry: "E-Commerce",
      complexity: "Medium",
      duration: "3 Months",
      techStack: ["React", "Node.js", "PostgreSQL", "Prisma"],
    },
    {
      icon: "🏥",
      name: "Hospital",
      title: "Hospital Management",
      description:
        "Appointments, patient records, doctors, pharmacy and billing.",
      industry: "Healthcare",
      complexity: "Enterprise",
      duration: "6 Months",
      techStack: ["Spring Boot", "Java", "PostgreSQL"],
    },
    {
      icon: "💼",
      name: "HR",
      title: "HR Management",
      description:
        "Recruitment, payroll, attendance and AI productivity insights.",
      industry: "HR",
      complexity: "Enterprise",
      duration: "6 Months",
      techStack: ["Next.js", "Node.js", "PostgreSQL"],
    },
    {
      icon: "🎓",
      name: "LMS",
      title: "Learning Management",
      description: "Courses, quizzes, certificates and student analytics.",
      industry: "Education",
      complexity: "Medium",
      duration: "3 Months",
      techStack: ["React", "Node.js", "MongoDB"],
    },
  ];
  const generateWorkflow = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/ai/generate-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          industry,
          complexity,
          duration,
          techStack,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Workflow generation failed");
      }
      router.push(`/projects/${data.projectId}`);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-w-0 w-full flex-1 overflow-auto p-4 pt-20 md:ml-64 md:w-auto md:p-8 md:pt-8">
        {/* Header */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Brain className="text-blue-600" size={38} />

            <div>
              <h1 className="text-5xl font-bold text-slate-900">
                AI Workflow Generator
              </h1>

              <p className="mt-2 text-slate-500">
                Describe your project and let AI generate a complete execution
                plan.
              </p>
            </div>
          </div>
        </div>
        {/* Quick Templates */}

        <div className="mb-10">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="text-yellow-500" size={22} />

            <h2 className="text-2xl font-bold text-slate-900">
              Quick Start Templates
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
              <button
                key={template.name}
                type="button"
                onClick={() => applyTemplate(template)}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{template.icon}</span>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {template.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {template.complexity}
                    </p>
                  </div>
                </div>

                <p className="mb-5 text-sm text-slate-600">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {template.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-8 xl:grid-cols-[1.8fr_1fr]">
          <div className="xl:col-span-2 rounded-3xl bg-white p-8 shadow text-slate-700">
            {/* Project Name */}

            <div className="mb-6">
              <label className="mb-2 block font-semibold text-slate-700">
                Project Name
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Food Delivery Application"
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}

            <div className="mb-6">
              <label className="mb-2 block font-semibold text-slate-700">
                Project Description
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project in detail..."
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Grid */}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Industry */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <Layers size={18} />
                  Industry
                </label>

                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-4"
                >
                  <option>Software</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Education</option>
                  <option>E-Commerce</option>
                  <option>Logistics</option>
                </select>
              </div>

              {/* Complexity */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <Brain size={18} />
                  Complexity
                </label>

                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-4"
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Enterprise</option>
                </select>
              </div>

              {/* Duration */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <CalendarDays size={18} />
                  Estimated Duration
                </label>

                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-4"
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>

              {/* Tech Stack */}

              <div className="md:col-span-2">
                <label className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
                  <Code2 size={18} />
                  Preferred Tech Stack
                </label>

                <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                  {technologies.map((tech) => {
                    const selected = techStack.includes(tech);

                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTechnology(tech)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white shadow-md"
                            : "border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600 text-xs font-bold">
                            ✓
                          </span>
                        )}

                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generate Button */}

            <button
              className="
mt-10
w-full
rounded-2xl
bg-gradient-to-r
from-blue-600
via-indigo-600
to-purple-600
py-4
text-lg
font-semibold
shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:shadow-2xl
active:scale-[0.98]
text-slate-700
"
              onClick={generateWorkflow}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Brain className="animate-pulse" size={22} />
                  Generating Workflow...
                </>
              ) : (
                <>
                  <Sparkles size={22} />
                  Generate AI Workflow
                </>
              )}
            </button>
          </div>
          <div className="sticky top-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8  shadow-xl text-slate-700">
            <div className="flex items-center gap-3">
              <Brain className="text-blue-400" size={28} />

              <div>
                <h2 className="text-2xl font-bold">
                  <Bot size={26} />
                  AI Execution Preview
                </h2>

                <p className="text-sm text-slate-300">
                  Here's what FlowMind AI will generate.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-xs uppercase text-slate-400">Project</p>
                  <h3 className="font-semibold">{title || "Your Project"}</h3>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">Industry</p>
                  <h3>{industry}</h3>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">Complexity</p>
                  <h3>{complexity}</h3>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">Duration</p>
                  <h3>{duration}</h3>
                </div>
              </div>
              {/* Estimated Output */}
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  📊 Estimated Output
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-xs text-slate-400">Tasks</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {estimatedTasks}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-xs text-slate-400">Milestones</p>
                  <p className="text-3xl font-bold text-green-400">
                    {estimatedMilestones}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-xs text-slate-400">Timeline</p>
                  <p className="font-semibold">{duration}</p>
                </div>

                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-xs text-slate-400">Risk</p>
                  <p className="font-semibold">
                    {complexity === "Enterprise"
                      ? "High"
                      : complexity === "Medium"
                        ? "Medium"
                        : "Low"}
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm text-slate-400">
                  Selected Technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {techStack.length === 0 ? (
                    <span className="text-slate-500">
                      No technologies selected
                    </span>
                  ) : (
                    techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                      >
                        {tech}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="border-t border-slate-700 pt-6">
                <h3 className="mb-4 font-semibold">AI will generate</h3>

                <div className="space-y-3">
                  <div>✅ Project Summary</div>

                  <div>✅ Smart Task Breakdown</div>

                  <div>✅ Milestones</div>

                  <div>✅ Timeline</div>

                  <div>✅ Risk Analysis</div>

                  <div>✅ Tech Recommendations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
