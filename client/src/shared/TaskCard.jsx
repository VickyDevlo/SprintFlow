import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flag,
  GripVertical,
  Trash2,
  User,
} from "lucide-react";
import { PRIORITY_STYLES } from "../assets/assets";
import { getDueInfo, isOverdue } from "../utils/utils";

const ORDER = ["todo", "progress", "done"];
const LABELS = { todo: "To Do", progress: "In Progress", done: "Done" };

export const TaskCard = ({ task, onMove, onDelete }) => {
  const index = ORDER.indexOf(task.status);
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;
  const due = getDueInfo(task.dueDate, task.status);
  const overdue = isOverdue(task);
  const finished = task.status === "done";

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className={`group relative cursor-grab overflow-hidden rounded-2xl border bg-bg/60 p-4 pl-5 transition hover:-translate-y-0.5 hover:border-lime/40 active:cursor-grabbing ${
        overdue ? "border-coral/40" : "border-border/60"
      }`}
    >
      {/* Priority stripe */}
      <span className={`absolute inset-y-0 left-0 w-1 ${priority.bar}`} />

      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${priority.chip}`}
        >
          <Flag size={10} />
          {task.priority}
        </span>

        <div className="flex items-center gap-1">
          <GripVertical
            size={14}
            className="hidden text-muted/60 sm:block sm:opacity-0 sm:transition sm:group-hover:opacity-100"
          />
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="cursor-pointer rounded-full p-1 text-muted transition hover:bg-coral/10 hover:text-coral sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h4
        className={`mt-3 text-sm font-semibold ${
          finished ? "text-muted line-through" : "text-text"
        }`}
      >
        {task.title}
      </h4>

      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-muted">{task.description}</p>
      )}

      {due && (
        <p className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${due.style}`}>
          <CalendarDays size={13} />
          {due.label}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        {task.assignee ? (
          <span className="flex items-center gap-2 text-xs text-muted">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-[11px] font-bold text-black">
              {task.assignee.charAt(0).toUpperCase()}
            </span>
            <span className="max-w-24 truncate capitalize">{task.assignee}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2 text-xs text-muted">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-border">
              <User size={12} />
            </span>
            Unassigned
          </span>
        )}

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(task.id, ORDER[index - 1])}
            aria-label={index > 0 ? `Move to ${LABELS[ORDER[index - 1]]}` : "Move left"}
            className="cursor-pointer rounded-full p-1 text-muted transition hover:bg-white/5 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            disabled={index === ORDER.length - 1}
            onClick={() => onMove(task.id, ORDER[index + 1])}
            aria-label={
              index < ORDER.length - 1 ? `Move to ${LABELS[ORDER[index + 1]]}` : "Move right"
            }
            className="cursor-pointer rounded-full p-1 text-muted transition hover:bg-white/5 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};