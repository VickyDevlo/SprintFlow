import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const PRIORITY = {
  low: "bg-lime/15 text-lime",
  medium: "bg-gold/15 text-gold",
  high: "bg-coral/15 text-coral",
};

const ORDER = ["todo", "progress", "done"];

export const TaskCard = ({ task, onMove, onDelete }) => {
  const index = ORDER.indexOf(task.status);

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="group cursor-grab rounded-2xl border border-border/60 bg-bg/60 p-4 transition hover:border-lime/40 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${PRIORITY[task.priority]}`}
        >
          {task.priority}
        </span>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          className="cursor-pointer rounded-full p-1 text-muted opacity-100 transition hover:bg-coral/10 hover:text-coral sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <h4 className="mt-3 text-sm font-semibold text-text">{task.title}</h4>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-muted">{task.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        {task.assignee ? (
          <span className="flex items-center gap-2 text-xs text-muted">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-[11px] font-bold text-black">
              {task.assignee.charAt(0).toUpperCase()}
            </span>
            <span className="max-w-24 truncate capitalize">{task.assignee}</span>
          </span>
        ) : (
          <span className="text-xs text-muted">Unassigned</span>
        )}

        {/* Move arrows (useful on touch, where drag is awkward) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(task.id, ORDER[index - 1])}
            aria-label="Move left"
            className="cursor-pointer rounded-full p-1 text-muted transition hover:bg-white/5 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            disabled={index === ORDER.length - 1}
            onClick={() => onMove(task.id, ORDER[index + 1])}
            aria-label="Move right"
            className="cursor-pointer rounded-full p-1 text-muted transition hover:bg-white/5 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};