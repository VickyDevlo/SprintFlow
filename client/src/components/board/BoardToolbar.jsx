import { Search, UserRound } from "lucide-react";

const PRIORITIES = [
  { key: "all", label: "All" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

const chip = (active) =>
  `cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
    active
      ? "border-lime/40 bg-lime/15 text-lime"
      : "border-border/60 text-muted hover:text-text"
  }`;

const BoardToolbar = ({
  query,
  onQuery,
  priority,
  onPriority,
  mineOnly,
  onMineOnly,
}) => (
  <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div className="relative w-full lg:max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
        className="w-full rounded-full border border-border/60 bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted focus:border-lime focus:outline-none"
      />
    </div>

    <div className="flex flex-wrap items-center gap-2">
      {PRIORITIES.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onPriority(key)}
          aria-pressed={priority === key}
          className={chip(priority === key)}
        >
          {label}
        </button>
      ))}
      <span className="mx-1 hidden h-5 w-px bg-border/80 sm:block" />
      <button
        type="button"
        onClick={() => onMineOnly(!mineOnly)}
        aria-pressed={mineOnly}
        className={`${chip(mineOnly)} flex items-center gap-1.5`}
      >
        <UserRound size={13} />
        My tasks
      </button>
    </div>
  </div>
);

export default BoardToolbar;