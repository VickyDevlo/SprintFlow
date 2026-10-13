import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "../../shared/TaskCard";

const BoardColumn = ({
  column,
  tasks,
  isFiltering,
  onAdd,
  onDropTask,
  onMove,
  onDelete,
}) => {
  const { key, label, icon: Icon, bar, text, chip } = column;
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onDropTask(id, key);
  };

  const emptyText = isFiltering
    ? "No matching tasks"
    : key === "todo"
      ? "Nothing planned yet. Add your first task."
      : "Drag tasks here";

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOver(false);
      }}
      onDrop={handleDrop}
      className={`flex min-h-96 flex-col overflow-hidden rounded-3xl border bg-surface/50 transition ${
        isOver ? "border-lime/60 bg-lime/5" : "border-border/60"
      }`}
    >
      <div className={`h-1 ${bar}`} />

      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="flex items-center gap-2 font-heading font-bold text-text">
          <Icon size={18} className={text} />
          {label}
        </h2>
        <div className="flex items-center gap-2">
          <span
            className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-bold ${chip}`}
          >
            {tasks.length}
          </span>
          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              aria-label="Add task"
              className="cursor-pointer rounded-full p-1.5 text-muted transition hover:bg-white/5 hover:text-lime"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
        {tasks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/50 p-6 text-center">
            <Icon size={28} className={`${text} opacity-40`} />
            <p className="text-xs text-muted">{emptyText}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default BoardColumn;