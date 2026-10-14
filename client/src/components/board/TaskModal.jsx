import { Modal } from "../../shared/Modal";
import { toDateInputValue } from "../../utils/utils";
import { INPUT_CLASS } from "../../assets/assets";

const TaskModal = ({ members, onClose, onSubmit }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, priority, assignee, dueDate } =
      Object.fromEntries(new FormData(e.currentTarget));

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      assignee,
      dueDate,
    });
  };

  return (
    <Modal
      title="New task"
      subtitle="Add a task to the To Do column."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        {/* Fields: the only part that can scroll on short screens */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pb-4 pr-1">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Title</span>
            <input
              name="title"
              required
              autoFocus
              maxLength={80}
              placeholder="Task title"
              className={INPUT_CLASS}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">
              Description (optional)
            </span>
            <textarea
              name="description"
              rows={2}
              maxLength={200}
              placeholder="What needs to be done?"
              className={`${INPUT_CLASS} resize-none`}
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">Priority</span>
              <select
                name="priority"
                defaultValue="medium"
                className={INPUT_CLASS}
              >
                <option value="low" className="bg-surface">Low</option>
                <option value="medium" className="bg-surface">Medium</option>
                <option value="high" className="bg-surface">High</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">Assignee</span>
              <select name="assignee" defaultValue="" className={INPUT_CLASS}>
                <option value="" className="bg-surface">Unassigned</option>
                {members.map((m) => (
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
              className={`${INPUT_CLASS} scheme-dark`}
            />
          </label>
        </div>

        {/* Footer: always pinned to the bottom */}
        <div className="shrink-0 border-t border-border/60 pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-lime py-3 font-bold text-bg transition hover:brightness-110"
          >
            Create task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;