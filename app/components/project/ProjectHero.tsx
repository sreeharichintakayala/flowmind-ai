import {
  Brain,
  Sparkles,
  Building2,
  Target,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";

interface ProjectHeroProps {
  project: any;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  isEditing: boolean;
  editForm: any;
  setEditForm: React.Dispatch<React.SetStateAction<any>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  updateProject: () => void;
  deleteProject: () => void;
}

export default function ProjectHero({
  project,
  progress,
  completedTasks,
  totalTasks,
  isEditing,
  editForm,
  setEditForm,
  setIsEditing,
  updateProject,
  deleteProject,
}: ProjectHeroProps) {
  return (
    <div className="rounded-3xl bg-red-600 p-10 shadow-2xl text-slate-700">
      {/* // <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 shadow-2xl"> */}
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="flex items-start justify-between gap-6">
            <div>
              {isEditing ? (
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-4xl font-bold text-white outline-none focus:border-blue-500"
                />
              ) : (
                <div className="flex items-center gap-4">
                  <Brain className="h-14 w-14 text-blue-700" />
                  <h1 className="text-5xl font-bold">{project.name}</h1>
                </div>
              )}

              <p className="mt-4 text-slate-400">
                Created on {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={updateProject}
                    className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={deleteProject}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="rounded-full bg-blue-500/20 px-5 py-2 text-blue-300">
              {totalTasks} Tasks
            </span>

            <span className="rounded-full bg-green-500/20 px-5 py-2 text-green-300">
              {completedTasks} Done
            </span>
          </div>
          <div className="mt-6">
            {isEditing ? (
              <textarea
                rows={4}
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-lg leading-8 text-slate-300">
                {project.description}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-100 to-violet-200 text-violet-800 px-5 py-3 shadow-sm"> */}
            {/* <div className="flex items-center gap-2 rounded-xl bg-violet-100 px-5 py-3 text-violet-700"> */}
            {/* <Sparkles size={18} /> */}
            {/* AI Generated */}
            {/* </div> */}
            {/* <div className="bg-violet-200 text-violet-800 px-5 py-3 rounded-xl">
              AI Generated
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-blue-500/20 px-5 py-3 text-blue-300">
              <Building2 size={18} />
              {project.industry}
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-orange-500/20 px-5 py-3 text-orange-300">
              <Target size={18} />
              {project.complexity}
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-3 text-emerald-300">
              <Clock3 size={18} />
              {project.duration}
            </div> */}
            <div className="space-y-4">
              <div className="h-12 w-48 rounded bg-red-500"></div>
              <div className="h-12 w-48 rounded bg-blue-500"></div>
              <div className="h-12 w-48 rounded bg-purple-500"></div>
              <div className="h-12 w-48 rounded bg-violet-500"></div>
            </div>
          </div>
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-700">
                Project Progress
              </h3>

              <span className="font-semibold text-blue-400">{progress}%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm text-slate-700">
              <span>{completedTasks} Completed</span>

              <span>{totalTasks} Total Tasks</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">{/* Right Section */}</div>
      </div>
    </div>

    // <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 shadow-2xl">
    //   <div className="grid gap-8 lg:grid-cols-5">
    //     {/* Left Side */}
    //     <div className="lg:col-span-3">{/* We'll add content here */}</div>

    //     {/* Right Side */}
    //     <div className="lg:col-span-2">{/* AI Summary will go here */}</div>
    //   </div>
    // </div>
  );
}
