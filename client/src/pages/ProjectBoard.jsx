import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Crown,
  Plus,
  UserPlus,
  Zap,
} from "lucide-react";
import { Section } from "../shared/Section";
import { Modal } from "../shared/Modal";
import { TaskCard } from "../shared/TaskCard";
import {
  addMember,
  closeProject,
} from "../redux/features/projects/projectsSlice";
import {
  addTask,
  deleteTask,
  moveTask,
} from "../redux/features/tasks/tasksSlice";

const COLUMNS = [
  {
    key: "todo",
    label: "To Do",
    icon: ClipboardList,
    bar: "bg-coral",
    text: "text-coral",
    chip: "bg-coral/15 text-coral",
  },
  {
    key: "progress",
    label: "In Progress",
    icon: Zap,
    bar: "bg-gold",
    text: "text-gold",
    chip: "bg-gold/15 text-gold",
  },
  {
    key: "done",
    label: "Done",
    icon: CheckCircle2,
    bar: "bg-lime",
    text: "text-lime",
    chip: "bg-lime/15 text-lime",
  },
];

const inputClass =
  "w-full rounded-xl border border-border/60 bg-bg/50 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-lime focus:outline-none";

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const activeId = useSelector((state) => state.projects.activeId);
  const project = useSelector((state) =>
    state.projects.items.find((p) => p.id === activeId),
  );
  const allTasks = useSelector((state) => state.tasks.items);

  const [modal, setModal] = useState(null); // "task" | "member" | null
  const [dragOver, setDragOver] = useState(null);

  const tasks = useMemo(
    () => allTasks.filter((t) => t.projectId === activeId),
    [allTasks, activeId],
  );

  if (!project) return null;

  const me = user?.name || user?.email?.split("@")[0] || "User";
  const isOwner = project.members[0] === me;
  const done = tasks.filter((t) => t.status === "done").length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const handleDrop = (e, status) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("text/plain");
    if (id) dispatch(moveTask({ id, status }));
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const { title, description, priority, assignee } = Object.fromEntries(
      new FormData(e.currentTarget),
    );
    dispatch(
      addTask({
        projectId: project.id,
        title: title.trim(),
        description: description.trim(),
        priority,
        assignee,
      }),
    );
    setModal(null);
  };

  const toDateInputValue = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const { name } = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(addMember({ projectId: project.id, name }));
    setModal(null);
  };

  return (
    <>
      <Section id="board" className="px-4 pt-28">
        {/* Back */}
        <button
          type="button"
          onClick={() => dispatch(closeProject())}
          className="group flex cursor-pointer items-center gap-2 text-sm text-muted transition hover:text-text"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          All projects
        </button>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="truncate font-heading text-3xl font-bold text-text md:text-5xl">
                {project.name}
              </h1>
              <span
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                  isOwner
                    ? "border-gold/30 bg-gold/10 text-gold"
                    : "border-border/60 text-muted"
                }`}
              >
                {isOwner && <Crown size={12} />}
                {isOwner ? "Project Owner" : "Member"}
              </span>
            </div>
            {project.description && (
              <p className="mt-2 max-w-xl text-sm text-muted">
                {project.description}
              </p>
            )}

            {/* Members + progress */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {project.members.slice(0, 5).map((name) => (
                    <span
                      key={name}
                      title={name}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-xs font-bold text-black ring-2 ring-bg"
                    >
                      {name.charAt(0).toUpperCase()}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted">
                  {project.members.length} member
                  {project.members.length !== 1 && "s"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-lime transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs text-muted">
                  {percent}% done ({done}/{tasks.length})
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setModal("task")}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-bg transition hover:brightness-110"
            >
              <Plus
                size={16}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              Add Task
            </button>
            {isOwner && (
              <button
                type="button"
                onClick={() => setModal("member")}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-5 py-3 text-sm font-semibold text-text transition hover:border-lime/50 hover:text-lime"
              >
                <UserPlus size={16} />
                Add Member
              </button>
            )}
          </div>
        </div>

        {/* Columns */}
        <div className="mt-10 grid gap-6 pb-16 md:grid-cols-3">
          {COLUMNS.map(({ key, label, icon: Icon, bar, text, chip }) => {
            const columnTasks = tasks.filter((t) => t.status === key);
            const active = dragOver === key;

            return (
              <div
                key={key}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(key);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    setDragOver(null);
                }}
                onDrop={(e) => handleDrop(e, key)}
                className={`flex min-h-96 flex-col overflow-hidden rounded-3xl border bg-surface/50 transition ${
                  active ? "border-lime/60 bg-lime/5" : "border-border/60"
                }`}
              >
                <div className={`h-1 ${bar}`} />
                <div className="flex items-center justify-between px-5 py-4">
                  <h2 className="flex items-center gap-2 font-heading font-bold text-text">
                    <Icon size={18} className={text} />
                    {label}
                  </h2>
                  <span
                    className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-bold ${chip}`}
                  >
                    {columnTasks.length}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-border/50 p-6 text-center text-xs text-muted">
                      {key === "todo"
                        ? "Add a task to get started"
                        : "Drop tasks here"}
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onMove={(id, status) =>
                          dispatch(moveTask({ id, status }))
                        }
                        onDelete={(id) => dispatch(deleteTask(id))}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Add task */}
      {/* Add task */}
      {modal === "task" && (
        <Modal
          title="New task"
          subtitle="Add a task to the To Do column."
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleTaskSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">Title</span>
              <input
                name="title"
                required
                autoFocus
                maxLength={80}
                placeholder="Task title"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">
                Description (optional)
              </span>
              <textarea
                name="description"
                rows={3}
                maxLength={200}
                placeholder="What needs to be done?"
                className={`${inputClass} resize-none`}
              />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted">Priority</span>
                <select
                  name="priority"
                  defaultValue="medium"
                  className={inputClass}
                >
                  <option value="low" className="bg-surface">
                    Low
                  </option>
                  <option value="medium" className="bg-surface">
                    Medium
                  </option>
                  <option value="high" className="bg-surface">
                    High
                  </option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted">Assignee</span>
                <select name="assignee" defaultValue="" className={inputClass}>
                  <option value="" className="bg-surface">
                    Unassigned
                  </option>
                  {project.members.map((m) => (
                    <option key={m} value={m} className="bg-surface">
                      {m}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">
                Due date (optional)
              </span>
              <input
                type="date"
                name="dueDate"
                min={toDateInputValue(new Date())}
                className={`${inputClass} scheme-dark`}
              />
            </label>

            <button
              type="submit"
              className="mt-2 cursor-pointer rounded-full bg-lime py-3 font-bold text-bg transition hover:brightness-110"
            >
              Create task
            </button>
          </form>
        </Modal>
      )}

      {/* Add member */}
      {modal === "member" && (
        <Modal
          title="Add member"
          subtitle="Add a teammate by name to this project."
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleMemberSubmit} className="flex flex-col gap-3">
            <input
              name="name"
              required
              autoFocus
              maxLength={40}
              placeholder="Member name"
              className={inputClass}
            />
            <button
              type="submit"
              className="mt-2 cursor-pointer rounded-full bg-lime py-3 font-bold text-bg transition hover:brightness-110"
            >
              Add member
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProjectBoard;
