export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const today = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

// Local date as YYYY-MM-DD (toISOString would use UTC and can be a day off)
export const toDateInputValue = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const isOverdue = (task) => {
  if (!task.dueDate || task.status === "done") return false;
  return new Date(`${task.dueDate}T00:00:00`) < startOfToday();
};

export const getDueInfo = (dueDate, status) => {
  if (!dueDate) return null;

  const due = new Date(`${dueDate}T00:00:00`);
  const today = startOfToday();
  const label = due.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  if (status !== "done") {
    if (due < today) return { label: `Overdue · ${label}`, style: "text-coral" };
    if (due.getTime() === today.getTime()) return { label: "Due today", style: "text-gold" };
  }
  return { label, style: "text-muted" };
};

export const timeAgo = (iso) => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
};