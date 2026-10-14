import { CalendarDays, Flag, User } from "lucide-react";
import { getDueInfo } from "../../../utils/utils";
import { DUE_TONE, PRIORITY } from "../../../assets/assets";

const Chip = ({ className = "", children }) => (
  <span
    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

const TaskInfo = ({ task }) => {
  const due = getDueInfo(task.dueDate, task.status);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Chip className={PRIORITY[task.priority] || PRIORITY.medium}>
          <Flag size={12} />
          <span className="capitalize">{task.priority} priority</span>
        </Chip>
        <Chip className={due ? DUE_TONE[due.style] : "bg-white/5 text-muted"}>
          <CalendarDays size={12} />
          {task.dueDate
            ? `Due ${new Date(`${task.dueDate}T00:00:00`).toLocaleDateString()}`
            : "No due date"}
        </Chip>
        <Chip className="bg-white/5 text-text">
          <User size={12} />
          <span className="capitalize">{task.assignee || "Unassigned"}</span>
        </Chip>
      </div>

      <p
        className={`whitespace-pre-wrap wrap-break-word rounded-2xl border border-border/60 bg-bg/40 p-4 text-sm ${
          task.description ? "text-text" : "text-muted"
        }`}
      >
        {task.description || "No description added."}
      </p>
    </>
  );
};

export default TaskInfo;