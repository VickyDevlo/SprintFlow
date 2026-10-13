import { useEffect } from "react";
import { X } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-border/60 bg-bg/50 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-lime focus:outline-none";

export const ProjectModal = ({ project, onClose, onSubmit }) => {
  const isEdit = Boolean(project);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = Object.fromEntries(new FormData(e.currentTarget));
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-md rounded-3xl border border-border/60 bg-surface/90 p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted transition hover:bg-white/5 hover:text-text"
        >
          <X size={16} />
        </button>

        <h2 id="project-modal-title" className="font-heading text-2xl font-bold text-text">
          {isEdit ? "Edit project" : "New project"}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {isEdit ? "Update your project details." : "Give your project a name to get started."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            name="name"
            required
            autoFocus
            maxLength={60}
            defaultValue={project?.name}
            placeholder="Project name"
            className={inputClass}
          />
          <textarea
            name="description"
            rows={3}
            maxLength={160}
            defaultValue={project?.description}
            placeholder="Short description (optional)"
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            className="mt-2 cursor-pointer rounded-full bg-lime py-3 font-bold text-bg transition hover:brightness-110"
          >
            {isEdit ? "Save changes" : "Create project"}
          </button>
        </form>
      </div>
    </div>
  );
};
 