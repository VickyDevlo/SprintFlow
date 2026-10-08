import { MoveRight } from "lucide-react";

export const CallToAction = ({ onClick }) => {
  return (
    <section className="section relative isolate overflow-hidden px-4 py-20          text-center mb-5">
      {/* Glow that fades into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-[min(90vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-coral)_0%,var(--color-gold)_40%,transparent_70%)] opacity-25 blur-3xl"
      />

      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Your move
      </p>

      <h2 className="mt-2 font-heading text-[clamp(1.75rem,1rem+3.5vw,3.75rem)] leading-[1.2] font-bold text-balance">
        Give your team <br />
        <span className="text-lime">a shared rhythm.</span>
      </h2>

      <p className="mt-4 text-center text-base text-muted md:text-[14px]">
        Create your workspace in minutes, assign your first task, and see
        exactly what's due this week.
      </p>

      <button
        onClick={onClick}
        className="group mx-auto mt-8 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-4 py-2 font-bold text-bg transition hover:brightness-110 max-md:text-sm md:px-8 md:py-4"
      >
        Open my workspace
        <MoveRight
          strokeWidth={1.5}
          className="size-5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </section>
  );
};
