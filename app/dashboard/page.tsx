"use client";
import {
  FolderKanban,
  CheckCircle,
  Clock3,
  AlertTriangle,
  ClipboardList,
  ListTodo,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  tasks: {
    completed: boolean;
  }[];
}
type Activity = {
  id: string;
  type: string;
  message: string;
  createdAt: string;
};
export default function DashboardPage() {
  const [analytics, setAnalytics] = useState({
    projectsCount: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0,
    highPriorityTasks: 0,
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [insights, setInsights] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [recentPlans, setRecentPlans] = useState([]);
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const plansRes = await fetch("/api/dashboard/recent-ai-plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const plansData = await plansRes.json();
        if (plansData.success) {
          setRecentPlans(plansData.plans);
        }
        console.log(data);
        if (data.success) {
          setAnalytics(data.analytics);
          setRecentProjects(data.recentProjects);
          setInsights(data.insights || []);
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
    fetchUser();
  }, []);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }
  const completionRate =
    analytics.totalTasks > 0
      ? Math.round((analytics.completedTasks / analytics.totalTasks) * 100)
      : 0;
  const chartData = [
    {
      name: "Completed",
      value: analytics.completedTasks,
    },
    {
      name: "In Progress",
      value: analytics.inProgressTasks,
    },
    {
      name: "Todo",
      value: analytics.todoTasks,
    },
  ];
  const COLORS = [
    "#22c55e", // green
    "#f59e0b", // yellow
    "#3b82f6", // blue
  ];
  console.log("recent Projects ", recentProjects);
  console.log("insights", insights);
  console.log("activities", activities);
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-w-0 w-full pt-16 md:ml-64 md:w-[calc(100%-16rem)] md:pt-0">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your projects and AI workflows.
          </p>
        </div>
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-slate-700">
            Quick Actions
          </h2>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => router.push("/projects")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105
transition-all
duration-300"
            >
              New Project
            </button>

            <button
              onClick={() => router.push("/ai-planner")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 hover:scale-105
transition-all
duration-300"
            >
              Generate AI Plan
            </button>
            <button
              onClick={() => router.push("/ai-history")}
              className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
            >
              AI History
            </button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* <div className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 curosr-pointer"> */}
          <div
            onClick={() => router.push("/projects")}
            className="
  rounded-xl
  bg-white
  p-6
  shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer
"
          >
            <div className="mb-4 h-2 w-12 rounded bg-blue-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <FolderKanban size={24} className="text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-600">Projects</h2>
            </div>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {analytics?.projectsCount}
            </p>
          </div>
          {/* <div className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 curosr-pointer"> */}
          <div
            className="
  rounded-xl
  bg-white
  p-6
  shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer
"
          >
            <div className="mb-4 h-2 w-12 rounded bg-purple-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList size={24} className="text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-600">
                Total Tasks
              </h2>
            </div>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {analytics?.totalTasks}
            </p>
          </div>
          {/* <div className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 curosr-pointer"> */}
          <div
            onClick={() => router.push("/projects")}
            className="
  rounded-xl
  bg-white
  p-6
  shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer
"
          >
            <div className="mb-4 h-2 w-12 rounded bg-green-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={24} className="text-green-500" />
              <h2 className="text-lg font-semibold text-gray-600">
                Completed Tasks
              </h2>
            </div>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {analytics?.completedTasks}
            </p>
          </div>
          {/* <div className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 curosr-pointer"> */}
          <div
            onClick={() => router.push("/projects")}
            className="
  rounded-xl
  bg-white
  p-6
  shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer
"
          >
            <div className="mb-4 h-2 w-12 rounded bg-yellow-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <Clock3 size={24} className="text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-600">
                In Progress
              </h2>
            </div>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {analytics.inProgressTasks}
            </p>
          </div>
          {/* <div className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 curosr-pointer"> */}
          <div
            onClick={() => router.push("/projects")}
            className="
  rounded-xl
  bg-white
  p-6
  shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer
"
          >
            <div className="mb-4 h-2 w-12 rounded bg-indigo-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <ListTodo size={24} className="text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-600">
                Todo Tasks
              </h2>
            </div>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {analytics.todoTasks}
            </p>
          </div>
          {/* <div className="rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 curosr-pointer"> */}
          <div
            onClick={() => router.push("/projects")}
            className="
  rounded-xl
  bg-white
  p-6
  shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer
"
          >
            <div className="mb-4 h-2 w-12 rounded bg-red-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={24} className="text-red-500" />
              <h2 className="text-lg font-semibold text-gray-600">
                High Priority
              </h2>
            </div>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {analytics.highPriorityTasks}
            </p>
          </div>

          {/* <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-sm font-medium text-gray-500">Total Tasks</h2>
            <p className="text-5xl font-bold text-slate-900">
              {analytics?.totalTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-sm font-medium text-gray-500">
              Completed Tasks
            </h2>
            <p className="text-5xl font-bold text-slate-900">
              {analytics?.completedTasks}
            </p>
          </div> */}

          <div
            className="mt-8 rounded-3xl bg-white p-8 shadow-lg shadow
  transition-all
  duration-300
  hover:shadow-2xl
  hover:-translate-y-2
  hover:scale-[1.02]
  cursor-pointer"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Overall Progress
              </h2>

              <span className="text-xl font-bold text-blue-600">
                {completionRate}%
              </span>
            </div>

            <div className="h-4 rounded-full bg-slate-200">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <div className="mt-4 flex justify-between text-sm text-slate-500">
              <span>{analytics.completedTasks} Completed</span>
              <span>{analytics.totalTasks} Total Tasks</span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="rounded-3xl bg-white p-8 shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🤖</div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  AI Insights
                </h2>

                <p className="text-slate-500">
                  Personalized recommendations based on your activity
                </p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700">
              {insights.map((insights, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-4"
                >
                  {insights}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">
            Task Distribution
          </h2>
          <p className="text-gray-500">Breakdown of tasks by current status</p>
          <div className="flex items-center justify-center">
            <div className="h-80 w-full max-w-xl">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={120}
                    label={false}
                  >
                    <text
                      x="50%"
                      y="38%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-900 text-3xl font-bold"
                    >
                      {analytics.totalTasks}
                    </text>
                    <text
                      x="50%"
                      y="48%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-500 text-sm"
                    >
                      Tasks
                    </text>
                    <text
                      x="50%"
                      y="58%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-500 text-sm"
                    >
                      {completionRate}% Completed
                    </text>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}{" "}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="rounded-3xl bg-white p-8 shadow">
            <h2 className="mb-6 text-4xl font-bold text-slate-900">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-xl border p-4"
                >
                  <span className="text-2xl">⚡</span>

                  <div>
                    <p className="font-medium text-slate-700">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Recent Projects
            </h2>

            <button
              onClick={() => router.push("/projects")}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              View All →
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recentProjects.map((project) => {
              const completed = project.tasks.filter(
                (task: any) => task.completed,
              ).length;

              const progress =
                project.tasks.length > 0
                  ? Math.round((completed / project.tasks.length) * 100)
                  : 0;

              return (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="cursor-pointer rounded-2xl bg-white p-6 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-slate-500 line-clamp-2">
                    {project.description}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-5">
                    <div className="flex justify-between text-sm mb-2 text-slate-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    {project.tasks.length} Tasks
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">
              Recent AI Plans
            </h2>

            <a
              href="/ai-history"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              View All →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {recentPlans.map((plan: any) => (
              <div
                onClick={() => router.push(`/ai-history/${plan.id}`)}
                key={plan.id}
                className="
                rounded-2xl
                bg-white
                p-6
                shadow
          hover:shadow-xl
hover:-translate-y-2
transition-all
duration-300
cursor-pointer
        "
              >
                <div className="mb-3">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                    AI Generated
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {plan.projectName}
                </h3>

                <p className="line-clamp-3 text-gray-500">{plan.description}</p>

                <p className="mt-4 text-sm text-gray-400">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
