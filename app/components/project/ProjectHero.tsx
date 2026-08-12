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
    <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 sm:p-8 lg:p-10 shadow-2xl">
      <div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
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
              <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-blue-400" />
                <h1 className="break-words text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {project.name}
                </h1>
              </div>
            )}

            <p className="mt-4 text-slate-400">
              Created on {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
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
          <div className="flex items-center gap-2 rounded-xl bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300 ring-1 ring-violet-500/20">
            {" "}
            <Sparkles size={18} />
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
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
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

          <div className="mt-3 flex justify-between text-sm text-slate-400">
            <span>{completedTasks} Completed</span>

            <span>{totalTasks} Total Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
