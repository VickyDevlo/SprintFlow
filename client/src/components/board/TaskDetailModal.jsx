import { useEffect, useRef, useState } from "react";
import TaskDetailHeader from "./taskDetail/TaskDetailHeader";
import TaskInfo from "./taskDetail/TaskInfo";
import TaskEditForm from "./taskDetail/TaskEditForm";
import StatusSwitcher from "./taskDetail/StatusSwitcher";
import AssigneeSelect from "./taskDetail/AssigneeSelect";
import CommentsSection from "./taskDetail/CommentsSection";
import CommentComposer from "./taskDetail/CommentComposer";
import { STATUSES } from "../../assets/assets";

const TaskDetailModal = ({
  task,
  members,
  onClose,
  onUpdate,
  onMove,
  onDelete,
  onComment,
}) => {
  const [editing, setEditing] = useState(false);
  const bodyRef = useRef(null);

  const comments = task.comments || [];
  const prevCount = useRef(comments.length);
  const status = STATUSES.find((s) => s.key === task.status) || STATUSES[0];

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Scroll to the newest comment only when one is added
  useEffect(() => {
    if (comments.length > prevCount.current) {
      bodyRef.current?.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    prevCount.current = comments.length;
  }, [comments.length]);

  const handleSave = (values) => {
    onUpdate(values);
    setEditing(false);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-60 flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-title"
        className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-surface shadow-2xl sm:rounded-3xl"
      >
        <div className={`h-1 shrink-0 ${status.tile}`} />

        <TaskDetailHeader
          title={task.title}
          status={status}
          editing={editing}
          onToggleEdit={() => setEditing((v) => !v)}
          onDelete={onDelete}
          onClose={onClose}
        />

        <div
          ref={bodyRef}
          className="flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"
        >
          {editing ? (
            <TaskEditForm
              task={task}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <TaskInfo task={task} />
          )}

          <StatusSwitcher current={task.status} onMove={onMove} />

          <AssigneeSelect
            value={task.assignee}
            members={members}
            onChange={(assignee) => onUpdate({ assignee })}
          />

          <CommentsSection comments={comments} />
        </div>

        <CommentComposer onSubmit={onComment} />
      </div>
    </div>
  );
};

export default TaskDetailModal;
