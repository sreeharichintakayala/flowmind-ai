"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  FolderKanban,
  AlertTriangle,
  Search,
} from "lucide-react";
interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  project?: {
    name: string;
  };
}
export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const filteredTasks = tasks.filter((task: any) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || task.status === filter;
    return matchesSearch && matchesFilter;
  });
  const getPriorityColor = (Priority: string) => {
    switch (Priority) {
      case "HIGH":
        return "bg-red-100 text-red-600";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-600";

      case "LOW":
        return "bg-green-100 text-green-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-600";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-600";

      case "TODO":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Tasks...
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 overflow-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900">Tasks</h1>

          <p className="mt-2 text-gray-500">
            Manage all your tasks in one place.
          </p>
        </div>

        {/* Search */}

        <div className="mb-6 rounded-2xl text-slate-600 bg-white p-6 shadow">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10"
            />

            {/* <input
              type="text"
              // placeholder="Search by task or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-14 pr-4 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            /> */}
            <input
              type="text"
              placeholder="Search by task or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "60px" }}
              className="w-full h-12 rounded-xl border border-slate-300 pl-20"
            />
          </div>

          {/* Filters */}

          <div className="mt-5 flex flex-wrap gap-3">
            {["ALL", "TODO", "IN_PROGRESS", "COMPLETED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-4 py-2 font-medium transition-all ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}

        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-slate-600">
          <div className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <ClipboardList size={28} className="mb-3 text-purple-600" />

            <h3 className="text-gray-500">Total Tasks</h3>

            <p className="text-4xl font-bold">{tasks.length}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <CheckCircle size={28} className="mb-3 text-green-600" />

            <h3 className="text-gray-500">Completed</h3>

            <p className="text-4xl font-bold">
              {tasks.filter((task) => task.status === "COMPLETED").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <Clock size={28} className="mb-3 text-yellow-500" />

            <h3 className="text-gray-500">In Progress</h3>

            <p className="text-4xl font-bold">
              {tasks.filter((task) => task.status === "IN_PROGRESS").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <AlertTriangle size={28} className="mb-3 text-red-500" />

            <h3 className="text-gray-500">High Priority</h3>

            <p className="text-4xl font-bold">
              {tasks.filter((task) => task.priority === "HIGH").length}
            </p>
          </div>
        </div>

        {/* Tasks Grid */}

        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <ClipboardList size={48} className="mx-auto mb-4 text-gray-400" />

            <h2 className="text-2xl font-semibold">No Tasks Found</h2>

            <p className="mt-2 text-gray-500">
              Create a project or generate an AI plan.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[100px] overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2">
                      {task.title}
                    </h2>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm">
                        <FolderKanban size={14} />
                        {task.project?.name || "No Project"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
