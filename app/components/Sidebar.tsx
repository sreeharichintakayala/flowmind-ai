import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Brain,
  History,
  LogOut,
  Bot,
} from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col p-6">
      {/* // <aside className="flex-1 ml-72 p-8 overflow-auto"> */}
      <h1 className="text-2xl font-bold">FlowMind AI</h1>

      <nav className="mt-10 flex flex-col gap-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            pathname === "/dashboard"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          href="/projects"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            pathname === "/projects"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <FolderKanban size={20} />
          Projects
        </Link>
        <Link
          href="/tasks"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            pathname === "/tasks"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <CheckSquare size={20} />
          Tasks
        </Link>
        <Link
          href="/ai-planner"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            pathname === "/ai-planner"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <Brain size={20} />
          AI Planner
        </Link>
        <Link
          href="/ai-workflow"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            pathname === "/ai-workflow"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <Bot size={20} />
          <span>AI Workflow</span>
        </Link>
        <Link
          href="/ai-history"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            pathname === "/ai-history"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <History size={20} /> Workflow History
        </Link>
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white hover:bg-red-600 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
