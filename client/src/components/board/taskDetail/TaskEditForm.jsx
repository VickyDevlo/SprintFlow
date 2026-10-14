import { INPUT_CLASS } from "../../../assets/assets";

const TaskEditForm = ({ task, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    onSave({
      title: f.title.trim(),
      description: f.description.trim(),
      priority: f.priority,
      dueDate: f.dueDate || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Title</span>
        <input
          name="title"
          required
          autoFocus
          maxLength={80}
          defaultValue={task.title}
          className={INPUT_CLASS}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Description</span>
        <textarea
          name="description"
          rows={3}
          maxLength={200}
          defaultValue={task.description}
          className={`${INPUT_CLASS} resize-none`}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Priority</span>
          <select name="priority" defaultValue={task.priority} className={INPUT_CLASS}>
            <option value="low" className="bg-surface">Low</option>
            <option value="medium" className="bg-surface">Medium</option>
            <option value="high" className="bg-surface">High</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Due date</span>
          <input
            type="date"
            name="dueDate"
            defaultValue={task.dueDate || ""}
            className={`${INPUT_CLASS} scheme-dark`}
          />
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-lime px-6 py-2.5 text-sm font-bold text-bg transition hover:brightness-110"
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-full border border-border/60 px-6 py-2.5 text-sm font-semibold text-muted transition hover:text-text"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskEditForm;