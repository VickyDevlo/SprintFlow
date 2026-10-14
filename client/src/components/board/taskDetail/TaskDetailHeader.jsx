import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

const TaskDetailHeader = ({
  title,
  status,
  editing,
  onToggleEdit,
  onDelete,
  onClose,
}) => {
  const [confirming, setConfirming] = useState(false);
  const StatusIcon = status.icon;

  return (
    <div className="flex shrink-0 items-start gap-3 px-5 pt-5 sm:px-6">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-black ${status.tile}`}
      >
        <StatusIcon size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <h2
          id="task-title"
          title={title}
          className="truncate font-heading text-xl font-bold text-text sm:text-2xl"
        >
          {title}
        </h2>
      </div>

      {confirming ? (
        <div className="flex shrink-0 items-center gap-2 text-xs">
          <span className="text-muted">Delete?</span>
          <button
            type="button"
            onClick={onDelete}
            className="cursor-pointer rounded-full bg-coral/15 px-3 py-1.5 font-semibold text-coral transition hover:bg-coral/25"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="cursor-pointer rounded-full px-3 py-1.5 text-muted transition hover:text-text"
          >
            No
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onToggleEdit}
            aria-label="Edit task"
            aria-pressed={editing}
            className={`cursor-pointer rounded-full p-2 transition hover:bg-white/5 ${
              editing ? "text-lime" : "text-muted hover:text-text"
            }`}
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            aria-label="Delete task"
            className="cursor-pointer rounded-full p-2 text-muted transition hover:bg-coral/10 hover:text-coral"
          >
            <Trash2 size={16} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-full p-2 text-muted transition hover:bg-white/5 hover:text-text"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetailHeader;