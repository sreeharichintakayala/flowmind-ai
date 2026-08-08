"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { div } from "framer-motion/client";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) {
      alert("Project name is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
          description: projectDescription,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setProjectName("");
        setProjectDescription("");
        fetchProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <main className="ml-64  p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-700">
            Welcome back 👋
          </h2>

          <p className="text-slate-500">Let's build something amazing today.</p>
        </div>
        <div>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold text-slate-900">
                Projects
                <span className="ml-3 text-2xl font-medium text-slate-400">
                  ({projects.length})
                </span>
              </h1>
              <p className="mt-2 text-lg text-slate-500">
                Manage all your projects and AI plans in one place
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              + New Project
            </button>
          </div>

          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 shadow-lg max-w-5xl mx-auto">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 text-7xl">📁</div>
                <h2 className="text-4xl font-bold text-slate-800">
                  No Projects Yet
                </h2>

                <p className="mt-4 text-lg text-slate-500">
                  Create your first project and start planning with AI.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Create Project
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <h2 className="text-2xl font-bold text-slate-900">
                    {project.name}
                  </h2>

                  <p className="mt-3 text-gray-600">{project.description}</p>

                  <p className="mt-4 text-sm text-gray-400">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-6 ">
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-semibold text-blue-600  hover:text-blue-700"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Create New Project
              </h2>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mb-4 w-full rounded-xl border border-slate-300 p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                className="mb-6 w-full rounded-xl border border-slate-300 p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={createProject}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
