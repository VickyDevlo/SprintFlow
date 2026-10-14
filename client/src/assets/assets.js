import {
  ListChecks,
  UserCheck,
  CalendarClock,
  Flag,
  MessageSquare,
  Gauge,
  Sparkles,
  Users,
  CalendarDays,
  Rocket,
  CheckCircle2, ClipboardList, Zap
} from "lucide-react";

export const NAV_LINKS = [
  [ "home", "Home" ],
  [ "tasks", "Tasks" ],
  [ "collaboration", "Collaboration" ],
  [ "how-it-works", "How it works" ],
  [ "tech-stack", "Tech" ],
];
export const AVATARS = [
  { l: "A", c: "bg-pink-500" },
  { l: "R", c: "bg-indigo-500" },
  { l: "M", c: "bg-emerald-500" },
  { l: "S", c: "bg-amber-500" },
];

export const FORM_DATA = {
  register: {
    title: "Create your account",
    subtitle: "Start your SprintFlow workspace in under a minute.",
    submit: "Create Account",
    prompt: "Already have an account?",
    switchLabel: "Log in",
    switchTo: "login",
  },
  login: {
    title: "Welcome back",
    subtitle: "Log in to continue to your workspace.",
    submit: "Sign In",
    prompt: "Don't have an account?",
    switchLabel: "Sign up",
    switchTo: "register",
  },
};

export const FEATURES = [
  {
    icon: ListChecks,
    title: "Create tasks in seconds",
    text: "Capture an idea as a task, add subtasks and checklists, and break big work into small steps.",
  },
  {
    icon: UserCheck,
    title: "Assign clear owners",
    text: "Every task has one person responsible, so nobody wonders who's handling what.",
  },
  {
    icon: CalendarClock,
    title: "Due dates & reminders",
    text: "Set deadlines and get nudged before things slip, not after.",
  },
  {
    icon: Flag,
    title: "Priorities & labels",
    text: "Mark what's urgent, tag the rest, and filter your list down to what matters today.",
  },
  {
    icon: MessageSquare,
    title: "Comments & attachments",
    text: "Discuss, mention teammates, and drop files right on the task.",
  },
  {
    icon: Gauge,
    title: "Track progress",
    text: "See what's to do, in progress, and done, with completion shown at a glance.",
  },
];

export const COLLABORATION_POINTS = [
  "Everyone knows who owns what",
  "Changes sync the instant they happen",
  "Notes stay attached to the card",
];

export const MESSAGES = [
  {
    id: 1,
    from: "Priya · 9:41",
    text: "Are we using token auth on the server yet?",
    own: false,
  },
  {
    id: 2,
    from: "you",
    text: "Yep, I'll wire up the sign-in endpoint.",
    own: true,
  },
  {
    id: 3,
    from: "SprintFlow",
    text: "Card assigned to you. Next move: ship the endpoint ✓",
    own: false,
  },
];

export const STATS = [
  { value: "15K+", label: "Tasks completed" },
  { value: "1,200", label: "Teams onboard" },
  { value: "94%", label: "On-time delivery" },
  { value: "5 min", label: "Setup time" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    icon: Sparkles,
    title: "Sign up and name your workspace",
    text: "Create a free account and set up your workspace in under five minutes. No training needed.",
  },
  {
    icon: Users,
    title: "Invite your team",
    text: "Add teammates by email and choose who can view, edit, or manage each project.",
  },
  {
    icon: CalendarDays,
    title: "Plan your week",
    text: "Drop in your to-dos, then order them by priority so everyone starts Monday with a clear list.",
  },
  {
    icon: Rocket,
    title: "Review and ship",
    text: "Check what's done and what's stuck, then carry the rest into next week with one click.",
  },
];

export const MARQUEE_TECH = [
  "Express",
  "MongoDB",
  "React",
  "Vite",
  "Tailwind",
  "Socket.io",
];

export const COLUMNS = [
  {
    key: "todo",
    label: "To Do",
    icon: ClipboardList,
    bar: "bg-coral",
    text: "text-coral",
    chip: "bg-coral/15 text-coral",
  },
  {
    key: "progress",
    label: "In Progress",
    icon: Zap,
    bar: "bg-gold",
    text: "text-gold",
    chip: "bg-gold/15 text-gold",
  },
  {
    key: "done",
    label: "Done",
    icon: CheckCircle2,
    bar: "bg-lime",
    text: "text-lime",
    chip: "bg-lime/15 text-lime",
  },
];

export const PRIORITY_STYLES = {
  low: { chip: "bg-lime/15 text-lime", bar: "bg-lime" },
  medium: { chip: "bg-gold/15 text-gold", bar: "bg-gold" },
  high: { chip: "bg-coral/15 text-coral", bar: "bg-coral" },
};

export const INPUT_CLASS =
  "w-full rounded-xl border border-border/60 bg-bg/50 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-lime focus:outline-none";

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Tasks", id: "tasks" },
      { label: "Collaboration", id: "collaboration" },
      { label: "How it works", id: "how-it-works" },
      { label: "Tech stack", id: "tech-stack" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:hello@sprintflow.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Help center", href: "/help" },
      { label: "Changelog", href: "/changelog" },
      { label: "Support", href: "mailto:support@sprintflow.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export const STATUSES = [
  {
    key: "todo",
    label: "To Do",
    icon: ClipboardList,
    tile: "bg-coral",
    active: "border-coral/40 bg-coral/15 text-coral",
  },
  {
    key: "progress",
    label: "In Progress",
    icon: Zap,
    tile: "bg-gold",
    active: "border-gold/40 bg-gold/15 text-gold",
  },
  {
    key: "done",
    label: "Done",
    icon: CheckCircle2,
    tile: "bg-lime",
    active: "border-lime/40 bg-lime/15 text-lime",
  },
];

export const PRIORITY = {
  low: "bg-lime/15 text-lime",
  medium: "bg-gold/15 text-gold",
  high: "bg-coral/15 text-coral",
};

export const DUE_TONE = {
  "text-coral": "bg-coral/15 text-coral",
  "text-gold": "bg-gold/15 text-gold",
  "text-muted": "bg-white/5 text-muted",
};