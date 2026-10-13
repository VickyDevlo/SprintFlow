import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Crown,
  Plus,
  UserPlus,
  Zap,
} from "lucide-react";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ProgressRing = ({ percent }) => (
  <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
    <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
      <circle
        cx="40"
        cy="40"
        r={RADIUS}
        fill="none"
        strokeWidth="7"
        stroke="currentColor"
        className="text-white/10"
      />
      <circle
        cx="40"
        cy="40"
        r={RADIUS}
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        stroke="currentColor"
        className="text-lime transition-all duration-700"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="font-heading text-lg font-bold text-text sm:text-xl">
        {percent}%
      </span>
      <span className="text-[10px] text-muted">complete</span>
    </div>
  </div>
);

const Stat = ({ icon: Icon, label, value, tone }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-bg/40 p-3 sm:p-4">
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${tone}`}
    >
      <Icon size={18} />
    </span>
    <div className="min-w-0">
      <p className="font-heading text-lg font-bold leading-none text-text sm:text-xl">
        {value}
      </p>
      <p className="mt-1 truncate text-xs text-muted">{label}</p>
    </div>
  </div>
);

const BoardHeader = ({
  project,
  isOwner,
  stats,
  percent,
  onBack,
  onAddTask,
  onAddMember,
}) => {
  const created = new Date(project.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const visible = project.members.slice(0, 5);
  const extra = project.members.length - visible.length;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/50 p-4 sm:p-6 md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/10 blur-3xl" />

      <button
        type="button"
        onClick={onBack}
        className="group relative flex cursor-pointer items-center gap-2 text-sm text-muted transition hover:text-text"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        All projects
      </button>

      <div className="relative mt-5 flex flex-col gap-6 md:flex-row md:items-start md:justify-between"> 
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="min-w-0 wrap-break-word font-heading text-2xl font-bold text-text sm:text-3xl md:text-5xl">
              {project.name}
            </h1>
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                isOwner
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : "border-border/60 text-muted"
              }`}
            >
              {isOwner && <Crown size={12} />}
              {isOwner ? "Project Owner" : "Member"}
            </span>
          </div>

          <p className="mt-3 max-w-xl text-sm text-muted">
            {project.description || "No description yet"}
          </p>

          <p className="mt-3 text-xs text-muted">
            Owned by{" "}
            <span className="capitalize text-text">{project.members[0]}</span>
            {" · "}Created {created}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2">
              {visible.map((name) => (
                <span
                  key={name}
                  title={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-xs font-bold text-black ring-2 ring-surface"
                >
                  {name.charAt(0).toUpperCase()}
                </span>
              ))}
              {extra > 0 && (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-text ring-2 ring-surface">
                  +{extra}
                </span>
              )}
            </div>
            <span className="text-xs text-muted">
              {project.members.length} member
              {project.members.length !== 1 && "s"}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center gap-4 sm:gap-6 md:w-auto">
          <ProgressRing percent={percent} />
          <div className="flex flex-col gap-3 sm:flex-none">
            <button
              type="button"
              onClick={onAddTask}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-lime px-5 py-3 text-sm font-bold text-bg transition hover:brightness-110"
            >
              <Plus
                size={16}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              Add Task
            </button>
            {isOwner && (
              <button
                type="button"
                onClick={onAddMember}
                className="flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border/60 px-5 py-3 text-sm font-semibold text-text transition hover:border-lime/50 hover:text-lime"
              >
                <UserPlus size={16} />
                Add Member
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative mt-6 grid grid-cols-2 gap-3 sm:mt-8 md:grid-cols-4">
        <Stat
          icon={ClipboardList}
          label="Total tasks"
          value={stats.total}
          tone="bg-white/10 text-text"
        />
        <Stat
          icon={Zap}
          label="In progress"
          value={stats.progress}
          tone="bg-gold/15 text-gold"
        />
        <Stat
          icon={AlertTriangle}
          label="Overdue"
          value={stats.overdue}
          tone="bg-coral/15 text-coral"
        />
        <Stat
          icon={CheckCircle2}
          label="Completed"
          value={stats.done}
          tone="bg-lime/15 text-lime"
        />
      </div>
    </div>
  );
};

export default BoardHeader;