"use client";
import { useRouter } from "next/navigation";
import ProjectHero from "../../components/project/ProjectHero";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  CalendarDays,
  Brain,
  Target,
  ClipboardList,
  BarChart3,
  Sparkles,
  Clock3,
} from "lucide-react";
interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  industry: string;
  complexity: string;
  duration: string;
  tasks: Task[];
}

export default function ProjectDetailsPage() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("MEDIUM");
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    fetchProject();
  }, []);
  useEffect(() => {
    if (project) {
      setEditForm({
        name: project.name,
        description: project.description || "",
      });
    }
  }, [project]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/projects/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProject(data.project);
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
        Loading...
      </div>
    );
  }
  if (!project) {
    return <div className="p-10">Project not found</div>;
  }
  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: taskTitle,
          priority: taskPriority,
          projectId: params.id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setShowTaskModal(false);
        setTaskTitle("");
        setTaskPriority("MEDIUM");
        fetchProject();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateTaskStatus = async (taskId: string, currentStatus: string) => {
    let nextStatus = "TODO";
    if (currentStatus == "TODO") {
      nextStatus = "IN_PROGRESS";
    } else if (currentStatus == "IN_PROGRESS") {
      nextStatus = "COMPLETED";
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProject();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setProject(data.project);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        router.push("/projects");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchProject();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const totalTasks = project?.tasks.length || 0;
  const completedTasks =
    project?.tasks.filter((task) => task.status === "COMPLETED").length || 0;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div
        onClick={() => router.push("/projects")}
        className="mb-6 cursor-pointer text-blue-600 font-semibold hover:text-blue-800"
      >
        ← Projects
      </div>
      <ProjectHero
        project={project}
        progress={progress}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        isEditing={isEditing}
        editForm={editForm}
        setEditForm={setEditForm}
        setIsEditing={setIsEditing}
        updateProject={updateProject}
        deleteProject={deleteProject}
      />
      <div className="mt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Tasks ({project.tasks.length})
          </h2>
          <button
            onClick={() => setShowTaskModal(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        <div className="grid gap-4">
          {project.tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl bg-white p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {task.title}
              </h3>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-3">
                  <span
                    className={`rounded-full bg-red-100 px-3 py-1 text-red-700 font-medium
                    ${
                      task.priority === "HIGH"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                    }
                  
                  
                  `}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={() => updateTaskStatus(task.id, task.status)}
                    className={`rounded-full bg-green-100 px-3 py-1 text-green-700 font-medium
                  ${
                    task.status === "TODO"
                      ? "bg-red-100 text-red-700"
                      : task.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }
                  
                  `}
                  >
                    {task.status}
                  </button>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Create New Task
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="mb-4 w-full rounded-xl border p-3 text-slate-900"
            />

            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="mb-6 w-full rounded-xl border p-3 text-slate-900"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTaskModal(false)}
                className="rounded-xl border px-4 py-2 text-slate-900"
              >
                Cancel
              </button>

              <button
                onClick={createTask}
                className="rounded-xl bg-blue-600 px-4 py-2 text-white"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
