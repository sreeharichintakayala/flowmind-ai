"use client";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Brain,
  History,
  LogOut,
  Bot,
  Menu,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: CheckSquare,
    },
    {
      href: "/ai-planner",
      label: "AI Planner",
      icon: Brain,
    },
    {
      href: "/ai-workflow",
      label: "AI Workflow",
      icon: Bot,
    },
    {
      href: "/ai-history",
      label: "Workflow History",
      icon: History,
    },
  ];

  const navigation = (
    <nav className="mt-8 flex flex-col gap-3">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={handleNavigation}
          className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
            pathname === href
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-slate-800"
          }`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* =========================
          MOBILE HEADER
      ========================== */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 md:hidden">
        <h1 className="text-xl font-bold text-white">FlowMind AI</h1>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-white transition-colors hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu size={26} />
        </button>
      </header>

      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* =========================
          MOBILE DRAWER
      ========================== */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 p-6 text-white transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">FlowMind AI</h1>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-300 hover:bg-slate-800 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {navigation}

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white transition-all hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* =========================
          DESKTOP SIDEBAR
      ========================== */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-slate-800 bg-slate-900 p-6 text-white md:flex">
        <h1 className="text-2xl font-bold">FlowMind AI</h1>

        {navigation}

        <div className="mt-auto p-0">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white transition-all hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
