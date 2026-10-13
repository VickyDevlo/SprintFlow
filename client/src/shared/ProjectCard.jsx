import { useEffect, useState } from "react";
import { Calendar, FolderKanban, Pencil, Trash2 } from "lucide-react";

const ACCENTS = [
  { stripe: "from-gold to-coral", icon: "from-gold to-coral" },
  { stripe: "from-lime to-gold", icon: "from-lime to-gold" },
  { stripe: "from-coral to-lime", icon: "from-coral to-lime" },
];

const pickAccent = (id) =>
  ACCENTS[
    [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % ACCENTS.length
  ];


export const ProjectCard = ({ project, onOpen, onEdit, onDelete }) => {
  const [confirming, setConfirming] = useState(false);
  const accent = pickAccent(project.id);
  const members = project.members || [];
  const created = new Date(project.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <article
      onClick={() => onOpen?.(project.id)}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-surface/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-lime/40 cursor-pointer"
    >
      {/* Accent stripe */}
      <div className="absolute inset-x-0 top-0 h-1" />

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-lime/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${accent.icon} text-black`}
        >
          <FolderKanban size={22} />
        </span>

        {confirming ? (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted">Delete?</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
              className="cursor-pointer rounded-full bg-coral/15 px-3 py-1 font-semibold text-coral transition hover:bg-coral/25"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setConfirming(false);
              }}
              className="cursor-pointer rounded-full px-3 py-1 text-muted transition hover:text-text"
            >
              No
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              aria-label={`Edit ${project.name}`}
              className="cursor-pointer rounded-full p-2 text-muted transition hover:bg-white/5 hover:text-text"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setConfirming(true);
              }}
              aria-label={`Delete ${project.name}`}
              className="cursor-pointer rounded-full p-2 text-muted transition hover:bg-coral/10 hover:text-coral"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <h3 className="relative mt-5 truncate font-heading text-xl font-bold text-text">
        {project.name}
      </h3>
      <p className="relative mt-1 line-clamp-2 min-h-10 text-sm text-muted">
        {project.description || "No description"}
      </p>

      <div className="relative mt-5 flex items-center justify-between border-t border-border/60 pt-4">
        {/* Member avatars */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((name, i) => (
              <span
                key={i}
                title={name}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-xs font-bold text-black ring-2 ring-surface"
              >
                {name.charAt(0).toUpperCase()}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted">
            {members.length} member{members.length !== 1 && "s"}
          </span>
        </div>

        <span className="flex items-center gap-1 text-xs text-muted">
          <Calendar size={12} />
          {created}
        </span>
      </div>
    </article>
  );
};
